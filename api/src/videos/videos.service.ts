import { Injectable, NotFoundException } from '@nestjs/common';
import { Video, VideoType } from './video.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TmdbRepositoryRepository } from './tmdb/tmdb-repository.repository';
import { Casting } from './interfaces/casting.interface';
import { Director } from './interfaces/director.interface';
import { VideoProvider } from './interfaces/provider.interface';
import { PageQuery } from 'src/pagination/page-query';
import { VideoReview } from './video-review.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(VideoReview)
    private videoReviewRepository: Repository<VideoReview>,
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
    private readonly tmdbRepositoryRepository: TmdbRepositoryRepository,
    private readonly usersService: UsersService,
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

  async getByid(id: string, type: VideoType): Promise<Video | null> {
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

  async getTrailer(id: string, type: VideoType): Promise<string | null> {
    return this.tmdbRepositoryRepository.getTrailer(Number(id), type);
  }

  async getProviders(id: string, type: VideoType): Promise<VideoProvider[]> {
    return this.tmdbRepositoryRepository.getProviders(Number(id), type);
  }

  async getSeasons(id: string): Promise<any[]> {
    return this.tmdbRepositoryRepository.getSeasons(Number(id));
  }

  async getReview(
    videoId: string,
    userId: string,
    videoType: VideoType,
  ): Promise<VideoReview> {
    return this.videoReviewRepository
      .findOne({
        where: {
          video: { externalId: videoId, type: videoType },
          user: { id: userId },
        },
        relations: ['video', 'user'],
      })
      .then((review) => {
        if (!review) {
          throw new NotFoundException('Review not found');
        }
        return review;
      });
  }

  async update(
    id: string,
    userId: string,
    videoReview: VideoReview,
    videoType: VideoType,
  ): Promise<VideoReview> {
    const existingReview = await this.videoReviewRepository.findOne({
      where: {
        video: { externalId: id, type: videoType },
        user: { id: userId },
      },
      relations: ['user', 'video'],
    });
    let reviewToSave: VideoReview;
    if (existingReview) {
      reviewToSave = existingReview;
      reviewToSave.comment = videoReview.comment;
      reviewToSave.isFavorite = videoReview.isFavorite;
      reviewToSave.isToWatch = videoReview.isToWatch;
      reviewToSave.isWatched = videoReview.isWatched;
      reviewToSave.actingRating = videoReview.actingRating;
      reviewToSave.scenarioRating = videoReview.scenarioRating;
      reviewToSave.visualsRating = videoReview.visualsRating;
      reviewToSave.musicRating = videoReview.musicRating;
    } else {
      const tmdb = await this.getByid(id, videoType);
      if (!tmdb) {
        throw new NotFoundException('Video not found');
      }
      reviewToSave = videoReview;
      reviewToSave.video = await this.videoRepository.save(tmdb);
      reviewToSave.user = await this.usersService.findOneById(userId);
    }
    return this.videoReviewRepository.save(reviewToSave);
  }
}
