import { EventCategory } from 'src/events-categories/event-category.entity';
import { Group } from 'src/groups/group.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  allDay!: boolean;

  @Column()
  start!: Date;

  @Column()
  end!: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt!: Date;

  @ManyToOne(() => EventCategory, (category) => category.events, {
    nullable: true,
  })
  category!: Relation<EventCategory | null>;

  @ManyToMany(() => Group, (group) => group.events, {
    nullable: true,
  })
  groups!: Relation<Group[]>;
}
