import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { MovieDetails } from './interfaces/movie-details.interface';
import { SerieDetails } from './interfaces/serie-details.interface';
import { ProductionCompany } from './interfaces/production-company.interface';
import { VideoReview } from './video-review.entity';

export enum VideoType {
  Serie = 'serie',
  Movie = 'movie',
  Anime = 'anime',
}

@Entity()
export class Video {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column({ type: 'float', nullable: true })
  userRating: number | null;

  @Column({ type: 'float', nullable: true })
  globalRating: number | null;

  @Column({ type: 'enum', enum: VideoType })
  type: VideoType;

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

  fileUrl: string | null;
  backdropUrl: string | null;
  releaseDate: Date;
  description: string;
  genres: string[];
  productionCompanies: ProductionCompany[];

  movieDetails: MovieDetails | null;
  serieDetails: SerieDetails | null;

  @OneToMany(() => VideoReview, (review) => review.id)
  reviews: Relation<VideoReview[]>;

  constructor(partial: Partial<Video>) {
    Object.assign(this, partial);
  }
}
