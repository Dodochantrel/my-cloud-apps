import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { User } from '../users/user.entity';
import { VideoType } from './video';

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

  @Column()
  videoId: string;

  @Column({
    type: 'enum',
    enum: VideoType,
  })
  videoType: VideoType;

  @ManyToOne(() => User, (user) => user.videoReviews)
  user: Relation<User>;

  constructor(partial: Partial<VideoReview>) {
    Object.assign(this, partial);
  }
}
