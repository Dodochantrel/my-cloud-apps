import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MovieDetails } from './interfaces/movie-details.interface';
import { SerieDetails } from './interfaces/serie-details.interface';
import { ProductionCompany } from './interfaces/production-company.interface';

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

  @Column({ default: false })
  isToWatch: boolean;

  @Column({ default: false })
  isSeen: boolean;

  @Column({ default: false })
  isFavorite: boolean;

  @Column({ type: 'float', nullable: true })
  userRating: number | null;

  @Column({ type: 'float', nullable: true })
  globalRating: number | null;

  @Column({ type: 'timestamp', nullable: true })
  seenAt: Date | null;

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

  constructor(partial: Partial<Video>) {
    Object.assign(this, partial);
  }
}
