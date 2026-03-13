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
    TypeOrmModule.forFeature([User, VideoReview]),
  ],
  controllers: [AuthenticationsController, VideosController],
  providers: [
    TokensService,
    HashsService,
    EmailsService,
    UsersService,
    AuthenticationsService,
    VideosService,
    TmdbRepositoryRepository,
  ],
})
export class AppModule {}
