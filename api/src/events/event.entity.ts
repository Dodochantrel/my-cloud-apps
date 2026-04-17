import { EventCategory } from 'src/events-categories/event-category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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
}
