import { PageQuery } from './../pagination/page-query';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  public save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  public findOneByEmail(
    email: string,
    relations: string[] = [],
  ): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: relations,
    });
  }

  public findOneById(id: string, relations: string[] = []): Promise<User> {
    return this.userRepository
      .findOne({ where: { id }, relations: relations })
      .then((user) => {
        if (!user) {
          throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
      });
  }

  public findAll(pageQuery: PageQuery, search?: string): Promise<[User[], number]> {
    return this.userRepository.findAndCount({
      where: search ? { email: ILike(`%${search}%`) }
        : {},
      skip: pageQuery.offset,
      take: pageQuery.limit,
    });
  }

  public delete(id: string): Promise<void> {
    return this.userRepository.delete(id).then(() => { });
  }
}
