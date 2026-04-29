import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { EventCategory } from './event-category.entity';
import { PageQuery } from 'src/pagination/page-query';

@Injectable()
export class EventsCategoriesService {
  constructor(
    @InjectRepository(EventCategory)
    private readonly categoryRepository: Repository<EventCategory>,
  ) {}

  async findAll(
    pageQuery: PageQuery,
    search?: string,
  ): Promise<{ items: EventCategory[]; total: number }> {
    const where = search ? { name: ILike(`%${search}%`) } : {};

    const [items, total] = await this.categoryRepository.findAndCount({
      where,
      skip: (pageQuery.page - 1) * pageQuery.limit,
      take: pageQuery.limit,
      order: { createdAt: 'DESC' },
    });

    return { items, total };
  }

  async findOne(id: string): Promise<EventCategory> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Catégorie non trouvée.');
    }
    return category;
  }

  async create(name: string, color: string): Promise<EventCategory> {
    const category = this.categoryRepository.create({ name, color });
    return this.categoryRepository.save(category);
  }

  async update(
    id: string,
    data: Partial<Pick<EventCategory, 'name' | 'color'>>,
  ): Promise<EventCategory> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Catégorie non trouvée.');
    }

    Object.assign(category, data);
    return this.categoryRepository.save(category);
  }

  async delete(id: string): Promise<void> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Catégorie non trouvée.');
    }

    await this.categoryRepository.remove(category);
  }
}
