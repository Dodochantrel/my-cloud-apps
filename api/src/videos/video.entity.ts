import { MovieDetails } from './interfaces/movie-details.interface';
import { SerieDetails } from './interfaces/serie-details.interface';
import { ProductionCompany } from './interfaces/production-company.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { VideoReview } from './video-review.entity';

export enum VideoType {
  Serie = 'serie',
  Movie = 'movie',
  Anime = 'anime',
}

@Entity()
@Unique(['externalId', 'type'])
export class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  externalId: string;

  @Column()
  title: string;

  @Column({ type: 'float' })
  globalRating: number;

  @Column({
    type: 'enum',
    enum: VideoType,
  })
  type: VideoType;
  @Column({ nullable: true })
  fileUrl?: string;

  @Column()
  releaseDate: Date;

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

  backdropUrl: string | null;
  description: string;
  genres: string[];
  productionCompanies: ProductionCompany[];
  movieDetails: MovieDetails | null;
  serieDetails: SerieDetails | null;

  @OneToMany(() => VideoReview, (review) => review.video)
  reviews: Relation<VideoReview[]>;

  constructor(partial: Partial<Video>) {
    Object.assign(this, partial);
  }
}
