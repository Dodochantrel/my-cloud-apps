import { ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { HashsService } from 'src/utils/hashs/hashs.service';
import { TokensService } from 'src/utils/tokens/tokens.service';

@Injectable()
export class AuthenticationsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashsService: HashsService,
    private readonly tokensService: TokensService,
  ) {}

  async register(user: User): Promise<User | null> {
    if (await this.verifyEmail(user.email)) {
      user.password = await this.hashsService.hash(user.password);
      user.prepareEmailRandomCode();
      const savedUser = await this.usersService.save(user);
      return savedUser;
    }
    return null;
  }

  private async verifyEmail(email: string): Promise<boolean> {
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email déjà utilisé');
    }
    return true;
  }

  async login(email: string, password: string, rememberMe: boolean): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.findOneByEmail(email);
    await this.checkLoginCredentials(user, password);

    const [accessToken, refreshToken] = await Promise.all([
      this.tokensService.generateAccessToken(user!.id, user!.email, user!.roles),
      this.tokensService.generateRefreshToken(user!.id, rememberMe),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async getMe(userId: string): Promise<User> {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return user;
  }

  private async checkLoginCredentials(user: User | null, password: string) {
    if (!user || !(await this.hashsService.compare(password, user.password))) {
      throw new ForbiddenException('Crédentials invalides');
    } else if (!user.isEmailVerified) {
      throw new ForbiddenException('Email non vérifié');
    }
  }

  async refreshTokens(userId: string): Promise<string> {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Email non vérifié');
    }
    return this.tokensService.generateAccessToken(user!.id, user!.email, user!.roles);
  }
}
