import { Injectable } from '@nestjs/common';
import { Video, VideoType } from './video.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TmdbRepositoryRepository } from './tmdb/tmdb-repository.repository';
import { Casting } from './interfaces/casting.interface';
import { Director } from './interfaces/director.interface';

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

  async getByExternalId(externalId: string): Promise<Video | null> {
    const video = await this.videoRepository.findOneBy({ externalId });
    return video ? video : this.tmdbRepositoryRepository.getMovie(Number(externalId));
  }

  async getCastings(externalId: string): Promise<Casting[]> {
    return this.tmdbRepositoryRepository.getCasting(Number(externalId), VideoType.Movie);
  }

  async getDirector(externalId: string): Promise<Director> {
    return this.tmdbRepositoryRepository.getDirector(Number(externalId), VideoType.Movie);
  }
}
