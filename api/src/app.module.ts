import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { User } from './users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokensService } from './utils/tokens/tokens.service';
import { HashsService } from './utils/hashs/hashs.service';
import { EmailsService } from './utils/emails/emails.service';
import { UsersService } from './users/users.service';
import { AuthenticationsService } from './authentications/authentications.service';
import { AuthenticationsController } from './authentications/authentications.controller';
import { VideosController } from './videos/videos.controller';
import { VideosService } from './videos/videos.service';
import { HttpModule } from '@nestjs/axios/dist/http.module';
import { TmdbRepositoryRepository } from './videos/tmdb/tmdb-repository.repository';
import { VideoReview } from './videos/video-review.entity';
import { Video } from './videos/video.entity';
import { GroupsController } from './groups/groups.controller';
import { GroupsService } from './groups/groups.service';
import { Group } from './groups/group.entity';
import { UsersController } from './users/users.controller';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { EventsCategoriesService } from './events-categories/events-categories.service';
import { EventsCategoriesController } from './events-categories/events-categories.controller';
import { Event } from './events/event.entity';
import { EventCategory } from './events-categories/event-category.entity';
import { GalleriesController } from './galleries/galleries.controller';
import { GalleriesService } from './galleries/galleries.service';
import { GalleriesCategoriesController } from './galleries-categories/galleries-categories.controller';
import { GalleriesCategoriesService } from './galleries-categories/galleries-categories.service';
import { Gallery } from './galleries/gallery.entity';
import { GalleryCategory } from './galleries-categories/gallery-category.entity';
import { StorageService } from './files/storage.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    HttpModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: parseInt(
            configService.get<string>('JWT_ACCESS_LIFETIME') as string,
          ),
        },
      }),
    }),
    TypeOrmModule.forFeature([
      User,
      VideoReview,
      Video,
      Group,
      Event,
      EventCategory,
      GalleryCategory,
      Gallery
    ]),
  ],
  controllers: [
    AuthenticationsController,
    VideosController,
    GroupsController,
    UsersController,
    EventsController,
    EventsCategoriesController,
    GalleriesController,
    GalleriesCategoriesController,
  ],
  providers: [
    TokensService,
    HashsService,
    EmailsService,
    UsersService,
    AuthenticationsService,
    VideosService,
    TmdbRepositoryRepository,
    GroupsService,
    EventsService,
    EventsCategoriesService,
    GalleriesService,
    GalleriesCategoriesService,
    StorageService,
  ],
})
export class AppModule {}
