import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { GalleryCategory } from './gallery-category.entity';
import { PageQuery } from 'src/pagination/page-query';
import { User } from 'src/users/user.entity';
import { GroupsService } from 'src/groups/groups.service';

@Injectable()
export class GalleriesCategoriesService {
  constructor(
    @InjectRepository(GalleryCategory)
    private readonly galleryCategoryRepository: TreeRepository<GalleryCategory>,
    @InjectRepository(GalleryCategory)
    private readonly galleryCategoryBaseRepository: Repository<GalleryCategory>,
    private readonly groupsService: GroupsService,
  ) {}

  // ─── Public API ────────────────────────────────────────────────────────────

  async getAll(
    userId: string,
    pageQuery: PageQuery,
    search?: string,
  ): Promise<{ items: GalleryCategory[]; total: number }> {
    const qb = this.galleryCategoryBaseRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.groups', 'group')
      .leftJoinAndSelect('group.members', 'member')
      .leftJoinAndSelect('group.moderators', 'moderator')
      .leftJoinAndSelect('group.admin', 'admin')
      .leftJoinAndSelect('category.user', 'user')
      .where('category.parent IS NULL')
      .andWhere('(user.id = :userId OR member.id = :userId OR moderator.id = :userId OR admin.id = :userId)', {
        userId,
      });

    if (search) {
      qb.andWhere('category.name ILIKE :search', { search: `%${search}%` });
    }

    const [items, total] = await qb
      .orderBy('category.createdAt', 'DESC')
      .skip(pageQuery.offset)
      .take(pageQuery.limit)
      .getManyAndCount();

    return { items, total };
  }

  async getOne(id: string, userId: string): Promise<GalleryCategory> {
    const category = await this.findOneWithRelationsOrFail(id);
    this.assertCanAccess(category, userId);

    return this.galleryCategoryRepository.findDescendantsTree(category, {
      relations: ['galleries'],
    });
  }

  async getGalleriesForCategory(id: string, userId: string): Promise<GalleryCategory> {
    const category = await this.findOneWithRelationsOrFail(id);
    this.assertCanAccess(category, userId);

    return this.galleryCategoryRepository.findDescendantsTree(category, {
      relations: ['galleries'],
    });
  }

  async create(userId: string, name: string, parentId: string | null, groupsId: string[]): Promise<GalleryCategory> {
    const category = this.galleryCategoryRepository.create({ name });

    category.user = new User({ id: userId });
    category.parent = parentId ? await this.findOneOrFail(parentId) : null;

    if (groupsId && groupsId.length > 0) {
      category.groups = await Promise.all(groupsId.map((id) => this.findGroupOrFail(id, userId)));
    }

    return this.galleryCategoryRepository.save(category);
  }

  async findGroupOrFail(id: string, userId: string) {
    const group = await this.groupsService.findOne(id, userId);
    if (!group) throw new NotFoundException('Groupe non trouvé.');
    return group;
  }

  async update(
    id: string,
    userId: string,
    name: string,
    parentId: string | null,
    groupsId: string[],
  ): Promise<GalleryCategory> {
    const category = await this.findOneWithRelationsOrFail(id);
    this.assertIsOwner(category, userId);

    category.name = name;

    if (parentId !== undefined) {
      category.parent = parentId ? await this.findOneOrFail(parentId) : null;
    }

    if (groupsId !== undefined) {
      category.groups = await Promise.all(groupsId.map((id) => this.findGroupOrFail(id, userId)));
    }

    return this.galleryCategoryRepository.save(category);
  }

  async delete(id: string, userId: string): Promise<void> {
    const category = await this.findOneWithRelationsOrFail(id);
    this.assertIsOwner(category, userId);
    await this.galleryCategoryRepository.remove(category);
  }

  // ─── Finders ───────────────────────────────────────────────────────────────

  private async findOneOrFail(id: string): Promise<GalleryCategory> {
    const category = await this.galleryCategoryRepository.findOne({
      where: { id },
      relations: ['parent', 'childrens'],
    });
    if (!category) throw new NotFoundException('Catégorie non trouvée.');
    return category;
  }

  private async findOneWithRelationsOrFail(id: string): Promise<GalleryCategory> {
    const category = await this.galleryCategoryRepository.findOne({
      where: { id },
      relations: ['parent', 'childrens', 'user', 'groups', 'groups.admin', 'groups.members', 'groups.moderators'],
    });
    if (!category) throw new NotFoundException('Catégorie non trouvée.');
    return category;
  }

  // ─── Guards ────────────────────────────────────────────────────────────────

  private assertIsOwner(category: GalleryCategory, userId: string): void {
    if (category.user?.id !== userId) {
      throw new ForbiddenException("Vous n'êtes pas autorisé à modifier cette catégorie.");
    }
  }

  private assertCanAccess(category: GalleryCategory, userId: string): void {
    if (category.user?.id === userId) return;

    const belongsToGroup = category.groups?.some((group) => group.allMembers?.some((member) => member.id === userId));

    if (!belongsToGroup) {
      throw new ForbiddenException("Vous n'êtes pas autorisé à accéder à cette catégorie.");
    }
  }
}
