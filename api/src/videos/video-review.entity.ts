import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { User } from '../users/user.entity';
import { Video } from './video.entity';

@Entity()
export class VideoReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  isWatched: boolean;

  @Column({ default: false })
  isToWatch: boolean;

  @Column({ nullable: true })
  comment: string;

  @Column({ default: false })
  isFavorite: boolean;

  @Column({ nullable: true })
  actingRating: number;

  @Column({ nullable: true })
  scenarioRating: number;

  @Column({ nullable: true })
  visualsRating: number;

  @Column({ nullable: true })
  musicRating: number;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.videoReviews)
  user: Relation<User>;

  @ManyToOne(() => Video, (video) => video.reviews)
  video: Relation<Video>;

  constructor(partial: Partial<VideoReview>) {
    Object.assign(this, partial);
  }
}
