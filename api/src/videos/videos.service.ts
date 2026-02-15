import { Injectable } from '@nestjs/common';
import { Video, VideoType } from './video.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TmdbRepositoryRepository } from './tmdb/tmdb-repository.repository';
import { Casting } from './interfaces/casting.interface';
import { Director } from './interfaces/director.interface';
import { VideoProvider } from './interfaces/provider.interface';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
    private readonly tmdbRepositoryRepository: TmdbRepositoryRepository
  ) {}

  async getAll(type: VideoType, search: string): Promise<Video[]> {
    switch (type) {
      case VideoType.Movie:
        return this.tmdbRepositoryRepository.getMovies(search)
      case VideoType.Series:
        return this.tmdbRepositoryRepository.getSeries(search)
      default:
        return Promise.resolve([]);
    }
  }

  async getByExternalId(externalId: string, type: VideoType): Promise<Video | null> {
    switch (type) {
      case VideoType.Movie:
        return this.tmdbRepositoryRepository.getMovie(Number(externalId))
      case VideoType.Series:
        return this.tmdbRepositoryRepository.getSerie(Number(externalId))
      default:
        return Promise.resolve(null);
    }
  }

  async getCastings(externalId: string, type: VideoType): Promise<Casting[]> {
    return this.tmdbRepositoryRepository.getCasting(Number(externalId), type);
  }

  async getDirector(externalId: string, type: VideoType): Promise<Director> {
    return this.tmdbRepositoryRepository.getDirector(Number(externalId), type);
  }

  async getTrailer(externalId: string, type: VideoType): Promise<string | null> {
    return this.tmdbRepositoryRepository.getTrailer(Number(externalId), type);
  }

  async getProviders(externalId: string, type: VideoType): Promise<VideoProvider[]> {
    return this.tmdbRepositoryRepository.getProviders(Number(externalId), type);
  }
}
