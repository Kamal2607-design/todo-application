import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log('Creating user:', createUserDto);
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }
  async findByMobile(mobile: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { mobile } });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
