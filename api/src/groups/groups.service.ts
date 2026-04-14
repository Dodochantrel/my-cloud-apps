import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, ILike } from 'typeorm';
import { Group } from './group.entity';
import { User } from 'src/users/user.entity';
import { PageQuery } from 'src/pagination/page-query';

import { GroupRole } from './group-role.enum';
import type { AddUserToGroupItemDto } from './dtos/add-users-to-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(
    userId: string,
    pageQuery: PageQuery,
    search?: string,
  ): Promise<{ items: Group[]; total: number }> {
    const whereConditions = [
      { admin: { id: userId }, ...(search ? { name: ILike(`%${search}%`) } : {}) },
      { moderators: { id: userId }, ...(search ? { name: ILike(`%${search}%`) } : {}) },
      { members: { id: userId }, ...(search ? { name: ILike(`%${search}%`) } : {}) },
    ];

    const [items, total] = await this.groupRepository.findAndCount({
      where: whereConditions,
      relations: ['members', 'moderators', 'admin'],
      skip: (pageQuery.page - 1) * pageQuery.limit,
      take: pageQuery.limit,
      order: { createdAt: 'DESC' },
    });

    return { items, total };
  }

  async create(name: string, adminId: string): Promise<Group> {
    const admin = await this.userRepository.findOneBy({ id: adminId });
    if (!admin) {
      throw new NotFoundException('Utilisateur non trouvé.');
    }

    const group = this.groupRepository.create({
      name,
      admin,
      members: [],
      moderators: [],
      createdBy: admin,
    });

    return this.groupRepository.save(group);
  }

  async addUsers(
    groupId: string,
    users: AddUserToGroupItemDto[],
    updatedById: string,
  ): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: ['members', 'moderators', 'admin'],
    });
    if (!group) {
      throw new NotFoundException('Groupe non trouvé.');
    }

    const userIds = users.map((u) => u.userId);
    const usersToAdd = await this.userRepository.findBy({ id: In(userIds) });
    if (usersToAdd.length !== userIds.length) {
      throw new NotFoundException(
        'Un ou plusieurs utilisateurs sont introuvables.',
      );
    }

    const userMap = new Map(usersToAdd.map((u) => [u.id, u]));
    const existingIds = new Set(group.allMembers.map((u) => u.id));

    for (const { userId, role } of users) {
      if (existingIds.has(userId)) continue;
      const user = userMap.get(userId)!;
      switch (role) {
        case GroupRole.ADMIN:
          group.admin = user;
          break;
        case GroupRole.MODERATOR:
          group.moderators = [...group.moderators, user];
          break;
        case GroupRole.MEMBER:
          group.members = [...group.members, user];
          break;
      }
    }

    const updatedBy = await this.userRepository.findOneBy({ id: updatedById });
    if (updatedBy) {
      group.updatedBy = updatedBy;
    }

    return this.groupRepository.save(group);
  }

  async update(
    groupId: string,
    adminId: string,
    data: Partial<Pick<Group, 'name'>>,
  ): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: ['admin'],
    });
    if (!group) {
      throw new NotFoundException('Groupe non trouvé.');
    }
    if (group.admin.id !== adminId) {
      throw new ForbiddenException(
        "Seul l'administrateur du groupe peut le modifier.",
      );
    }

    Object.assign(group, data);
    group.updatedBy = group.admin;
    return this.groupRepository.save(group);
  }

  async delete(groupId: string, userId: string): Promise<void> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: ['admin'],
    });
    if (!group) {
      throw new NotFoundException('Groupe non trouvé.');
    }
    if (group.admin.id !== userId) {
      throw new ForbiddenException(
        "Seul l'administrateur du groupe peut le supprimer.",
      );
    }

    await this.groupRepository.remove(group);
  }
}
