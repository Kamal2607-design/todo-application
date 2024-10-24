import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagDto } from './tags.dto';
import { Tag } from './tags.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  create(tagDto: TagDto): Promise<Tag> {
    const tag = this.tagRepository.create(tagDto);
    return this.tagRepository.save(tag);
  }
}