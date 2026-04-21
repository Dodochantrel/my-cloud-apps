import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, In, Repository } from 'typeorm';
import { Event } from './event.entity';
import { EventCategory } from 'src/events-categories/event-category.entity';
import { Group } from 'src/groups/group.entity';
import { PageQuery } from 'src/pagination/page-query';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(EventCategory)
    private readonly categoryRepository: Repository<EventCategory>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async findAll(
    pageQuery: PageQuery,
    startDate?: Date,
    endDate?: Date,
    search?: string,
  ): Promise<{ items: Event[]; total: number }> {
    const where: any = search ? { title: ILike(`%${search}%`) } : {};
    where.start = Between(startDate, endDate);

    const [items, total] = await this.eventRepository.findAndCount({
      where,
      relations: ['category', 'groups'],
      skip: pageQuery.offset,
      take: pageQuery.limit,
      order: { start: 'DESC' },
    });

    return { items, total };
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['category', 'groups'],
    });
    if (!event) {
      throw new NotFoundException('Événement non trouvé.');
    }
    return event;
  }

  async create(
    data: { title: string; allDay: boolean; start: Date; end: Date },
    userId: string,
    categoryId?: string,
    groupsId?: string[],
  ): Promise<Event> {
    const event = this.eventRepository.create(data);

    if (categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      if (!category) {
        throw new NotFoundException('Catégorie non trouvée.');
      }
      event.category = category;
    }

    if (groupsId && groupsId.length > 0) {
      const groups = await this.groupRepository.find({
        where: { id: In(groupsId) },
        relations: ['admin', 'members', 'moderators'],
      });

      for (const group of groups) {
        const isMember = group.allMembers.some((m) => m.id === userId);
        if (!isMember) {
          throw new ForbiddenException(
            `Vous n'appartenez pas au groupe "${group.name}".`,
          );
        }
      }

      event.groups = groups;
    } else {
      event.groups = [];
    }

    return this.eventRepository.save(event);
  }

  async update(
    id: string,
    data: Partial<Pick<Event, 'title' | 'allDay' | 'start' | 'end'>>,
    userId: string,
    categoryId?: string | null,
    groupsId?: string[],
  ): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['category', 'groups'],
    });
    if (!event) {
      throw new NotFoundException('Événement non trouvé.');
    }

    Object.assign(event, data);

    if (categoryId === null) {
      event.category = null;
    } else if (categoryId !== undefined) {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      if (!category) {
        throw new NotFoundException('Catégorie non trouvée.');
      }
      event.category = category;
    }

    if (groupsId !== undefined) {
      if (groupsId.length > 0) {
        const groups = await this.groupRepository.find({
          where: { id: In(groupsId) },
          relations: ['admin', 'members', 'moderators'],
        });

        for (const group of groups) {
          const isMember = group.allMembers.some((m) => m.id === userId);
          if (!isMember) {
            throw new ForbiddenException(
              `Vous n'appartenez pas au groupe "${group.name}".`,
            );
          }
        }

        event.groups = groups;
      } else {
        event.groups = [];
      }
    }

    return this.eventRepository.save(event);
  }

  async delete(id: string): Promise<void> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException('Événement non trouvé.');
    }

    await this.eventRepository.remove(event);
  }
}
