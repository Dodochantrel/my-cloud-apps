import { PageQuery } from './../pagination/page-query';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Video, VideoType } from './video.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TmdbRepositoryRepository } from './tmdb/tmdb-repository.repository';
import { Casting } from './interfaces/casting.interface';
import { Director } from './interfaces/director.interface';
import { VideoProvider } from './interfaces/provider.interface';
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

  async getCurrent(type: VideoType, pageQuery: PageQuery, userId: string): Promise<Video[]> {
    let current;
    switch (type) {
      case VideoType.Movie:
        current = await this.tmdbRepositoryRepository.getMovies(pageQuery);
        break;
      case VideoType.Serie:
        current = await this.tmdbRepositoryRepository.getSeries(pageQuery);
        break;
      default:
        return Promise.resolve([]);
    }
    // Récupérer les reviews pour les vidéos courantes
    for (const video of current) {
      video.review = await this.videoReviewRepository.findOne({
        where: {
          video: { externalId: video.externalId, type: video.type },
          user: { id: userId },
        },
      });
    }
    return current;
  }

  async getByid(id: string, type: VideoType): Promise<Video> {
    let video: Video | null = null;
    switch (type) {
      case VideoType.Movie:
        video = await this.tmdbRepositoryRepository.getMovie(Number(id));
        break;
      case VideoType.Serie:
        video = await this.tmdbRepositoryRepository.getSerie(Number(id));
        break;
      default:
        throw new NotFoundException('Video not found');
    }
    if (!video) {
      throw new NotFoundException('Video not found');
    }
    return video;
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
    const existingReview = await this.findOneReview(id, videoType, userId);
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
      reviewToSave = videoReview;
      reviewToSave.video = await this.getOneVideo(id, videoType);
      reviewToSave.user = await this.usersService.findOneById(userId);
    }
    return this.videoReviewRepository.save(reviewToSave);
  }

  async getWatchedVideos(
    userId: string,
    videoType: VideoType,
    pageQuery: PageQuery,
  ): Promise<{ items: VideoReview[]; total: number }> {
    const [items, total] = await this.videoReviewRepository.findAndCount({
      where: {
        user: { id: userId },
        video: { type: videoType },
        isWatched: true,
      },
      take: pageQuery.limit,
      skip: pageQuery.offset,
      relations: ['video'],
    });
    return { items, total };
  }

  async getToWatchVideos(
    userId: string,
    videoType: VideoType,
    pageQuery: PageQuery,
  ): Promise<{ items: VideoReview[]; total: number }> {
    const [items, total] = await this.videoReviewRepository.findAndCount({
      where: {
        user: { id: userId },
        video: { type: videoType },
        isToWatch: true,
      },
      take: pageQuery.limit,
      skip: pageQuery.offset,
      relations: ['video'],
    });
    return { items, total };
  }

  findOneReview(videoId: string, videoType: VideoType, userId: string): Promise<VideoReview | null> {
    return this.videoReviewRepository.findOne({
      where: {
        video: { externalId: videoId, type: videoType },
        user: { id: userId },
      },
      relations: ['user', 'video'],
    });
  }

  async addOneWatched(videoId: string, videoType: VideoType, userId: string): Promise<VideoReview> {
    let videoReview = await this.findOneReview(videoId, videoType, userId);
    if (videoReview) {
      videoReview.isWatched = !videoReview.isWatched;
    } else {
      videoReview = new VideoReview({
        isWatched: true,
      });
      videoReview.video = await this.getOneVideo(videoId, videoType);
      videoReview.user = await this.usersService.findOneById(userId);
    }
    return this.videoReviewRepository.save(videoReview);
  }

  async addOneFavorite(videoId: string, videoType: VideoType, userId: string): Promise<VideoReview> {
    let videoReview = await this.findOneReview(videoId, videoType, userId);
    if (videoReview) {
      videoReview.isFavorite = !videoReview.isFavorite;
    } else {
      videoReview = new VideoReview({
        isFavorite: true,
      });
      videoReview.video = await this.getOneVideo(videoId, videoType);
      videoReview.user = await this.usersService.findOneById(userId);
    }
    return this.videoReviewRepository.save(videoReview);
  }

  async addOneToWatch(videoId: string, videoType: VideoType, userId: string): Promise<VideoReview> {
    let videoReview = await this.findOneReview(videoId, videoType, userId);
    if (videoReview) {
      videoReview.isToWatch = !videoReview.isToWatch;
    } else {
      videoReview = new VideoReview({
        isToWatch: true,
      });
      videoReview.video = await this.getOneVideo(videoId, videoType);
      videoReview.user = await this.usersService.findOneById(userId);
    }
    return this.videoReviewRepository.save(videoReview);
  }

  async getOneVideo(id: string, videoType: VideoType) {
    const tmdb = await this.getByid(id, videoType);
    return this.videoRepository
        .upsert(tmdb, ['externalId', 'type'])
        .then((result) =>
          this.videoRepository.findOneOrFail({ where: { id: result.identifiers[0].id } }),
        );
  }
}
