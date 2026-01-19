import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  public findOneByEmail(email: string, relations: string[] = []): Promise<User | null> {
    return this.userRepository.findOne({ where: { email }, relations: relations  });
  }

  public findOneById(id: string, relations: string[] = []): Promise<User | null> {
    return this.userRepository.findOne({ where: { id }, relations: relations });
  }

  public findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public delete(id: string): Promise<void> {
    return this.userRepository.delete(id).then(() => {});
  }
}
