import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Event } from './event.entity';
import { EventCategory } from 'src/events-categories/event-category.entity';
import { Group } from 'src/groups/group.entity';
import { PageQuery } from 'src/pagination/page-query';
import { GroupsService } from 'src/groups/groups.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(EventCategory)
    private readonly categoryRepository: Repository<EventCategory>,
    private readonly groupsService: GroupsService,
  ) {}

  // ─── Public API ────────────────────────────────────────────────────────────

  async findAll(
    userId: string,
    pageQuery: PageQuery,
    startDate?: Date,
    endDate?: Date,
    search?: string,
  ): Promise<{ items: Event[]; total: number }> {
    const qb = this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.category', 'category')
      .leftJoinAndSelect('event.groups', 'group')
      .leftJoinAndSelect('group.members', 'member')
      .leftJoinAndSelect('group.moderators', 'moderator')
      .leftJoinAndSelect('group.admin', 'admin')
      .leftJoinAndSelect('event.user', 'user')
      .where(
        '(user.id = :userId OR member.id = :userId OR moderator.id = :userId OR admin.id = :userId)',
        { userId },
      );

    if (search) {
      qb.andWhere('event.title ILIKE :search', { search: `%${search}%` });
    }

    if (startDate && endDate) {
      qb.andWhere('event.start BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const [items, total] = await qb
      .orderBy('event.start', 'DESC')
      .skip(pageQuery.offset)
      .take(pageQuery.limit)
      .getManyAndCount();

    return { items, total };
  }

  async findOne(id: string, userId: string): Promise<Event> {
    const event = await this.findOneWithRelationsOrFail(id);
    this.assertCanAccess(event, userId);
    return event;
  }

  async create(
    data: { title: string; allDay: boolean; start: Date; end: Date },
    userId: string,
    categoryId?: string,
    groupsId?: string[],
  ): Promise<Event> {
    const event = this.eventRepository.create(data);

    event.user = { id: userId } as any;
    event.category = categoryId
      ? await this.resolveCategoryOrFail(categoryId)
      : null;
    event.groups = groupsId?.length
      ? await this.resolveGroupsOrFail(groupsId, userId)
      : [];

    return this.eventRepository.save(event);
  }

  async update(
    id: string,
    data: Partial<Pick<Event, 'title' | 'allDay' | 'start' | 'end'>>,
    userId: string,
    categoryId?: string | null,
    groupsId?: string[],
  ): Promise<Event> {
    const event = await this.findOneWithRelationsOrFail(id);
    this.assertIsOwner(event, userId);

    Object.assign(event, data);

    if (categoryId === null) {
      event.category = null;
    } else if (categoryId !== undefined) {
      event.category = await this.resolveCategoryOrFail(categoryId);
    }

    if (groupsId !== undefined) {
      event.groups = groupsId.length
        ? await this.resolveGroupsOrFail(groupsId, userId)
        : [];
    }

    return this.eventRepository.save(event);
  }

  async delete(id: string, userId: string): Promise<void> {
    const event = await this.findOneOrFail(id);
    this.assertIsOwner(event, userId);
    await this.eventRepository.remove(event);
  }

  // ─── Resolvers ─────────────────────────────────────────────────────────────

  private async resolveCategoryOrFail(categoryId: string): Promise<EventCategory> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) throw new NotFoundException('Catégorie non trouvée.');
    return category;
  }

  private async resolveGroupsOrFail(
    groupsId: string[],
    userId: string,
  ): Promise<Group[]> {
    const groups = await this.groupsService.getMyGroups(userId);

    for (const group of groups) {
      if (!group.allMembers.some((m) => m.id === userId)) {
        throw new ForbiddenException(
          `Vous n'appartenez pas au groupe "${group.name}".`,
        );
      }
    }

    return groups;
  }

  // ─── Finders ───────────────────────────────────────────────────────────────

  private async findOneOrFail(id: string): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!event) throw new NotFoundException('Événement non trouvé.');
    return event;
  }

  private async findOneWithRelationsOrFail(id: string): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: [
        'category',
        'groups',
        'groups.admin',
        'groups.members',
        'groups.moderators',
        'user',
      ],
    });
    if (!event) throw new NotFoundException('Événement non trouvé.');
    return event;
  }

  // ─── Guards ────────────────────────────────────────────────────────────────

  private assertIsOwner(event: Event, userId: string): void {
    if (event.user.id !== userId) {
      throw new ForbiddenException(
        "Vous n'êtes pas autorisé à effectuer cette action sur cet événement.",
      );
    }
  }

  private assertCanAccess(event: Event, userId: string): void {
    if (event.user.id === userId) return;

    const belongsToLinkedGroup = event.groups?.some((group) =>
      group.allMembers.some((m) => m.id === userId),
    );

    if (!belongsToLinkedGroup) {
      throw new ForbiddenException(
        "Vous n'êtes pas autorisé à accéder à cet événement.",
      );
    }
  }
}