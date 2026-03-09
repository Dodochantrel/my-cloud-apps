import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Video } from './video.entity';
import { User } from '../users/user.entity';

@Entity()
export class VideoReview {
  @PrimaryColumn()
  id: string;

  @Column({ default: false })
  isWatched: boolean;

  @Column({ default: false })
  isToWatch: boolean;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  rating: number;

  @Column({ default: false })
  isFavorite: boolean;

  @Column({ nullable: true })
  actingRating: number;

  @Column({ nullable: true })
  storyRating: number;

  @Column({ nullable: true })
  visualsRating: number;

  @Column({ nullable: true })
  musicRating: number;

  @ManyToOne(() => Video, (video) => video.reviews)
  video: Relation<Video>;

  @ManyToOne(() => User, (user) => user.videoReviews)
  user: Relation<User>;

  constructor(partial: Partial<VideoReview>) {
    Object.assign(this, partial);
  }
}
