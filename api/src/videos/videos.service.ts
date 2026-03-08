import { Injectable } from '@nestjs/common';
import { Video, VideoType } from './video.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TmdbRepositoryRepository } from './tmdb/tmdb-repository.repository';
import { Casting } from './interfaces/casting.interface';
import { Director } from './interfaces/director.interface';
import { VideoProvider } from './interfaces/provider.interface';
import { PageQuery } from 'src/pagination/page-query';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
    private readonly tmdbRepositoryRepository: TmdbRepositoryRepository,
  ) {}

  async getAll(type: VideoType, search: string): Promise<Video[]> {
    switch (type) {
      case VideoType.Movie:
        return this.tmdbRepositoryRepository.getMovies(null, search);
      case VideoType.Serie:
        return this.tmdbRepositoryRepository.getSeries(null, search);
      default:
        return Promise.resolve([]);
    }
  }

  async getCurrent(type: VideoType, pageQuery: PageQuery): Promise<Video[]> {
    switch (type) {
      case VideoType.Movie:
        return this.tmdbRepositoryRepository.getMovies(pageQuery);
      case VideoType.Serie:
        return this.tmdbRepositoryRepository.getSeries(pageQuery);
      default:
        return Promise.resolve([]);
    }
  }

  async getByid(
    id: string,
    type: VideoType,
  ): Promise<Video | null> {
    switch (type) {
      case VideoType.Movie:
        return this.tmdbRepositoryRepository.getMovie(Number(id));
      case VideoType.Serie:
        return this.tmdbRepositoryRepository.getSerie(Number(id));
      default:
        return Promise.resolve(null);
    }
  }

  async getCastings(id: string, type: VideoType): Promise<Casting[]> {
    return this.tmdbRepositoryRepository.getCasting(Number(id), type);
  }

  async getDirector(id: string, type: VideoType): Promise<Director> {
    return this.tmdbRepositoryRepository.getDirector(Number(id), type);
  }

  async getTrailer(
    id: string,
    type: VideoType,
  ): Promise<string | null> {
    return this.tmdbRepositoryRepository.getTrailer(Number(id), type);
  }

  async getProviders(
    id: string,
    type: VideoType,
  ): Promise<VideoProvider[]> {
    return this.tmdbRepositoryRepository.getProviders(Number(id), type);
  }

  async getSeasons(id: string): Promise<any[]> {
    return this.tmdbRepositoryRepository.getSeasons(Number(id));
  }

  async update(id: string): Promise<Video> {
    return this.videoRepository.findOneByOrFail({ id: id });
  }
}
