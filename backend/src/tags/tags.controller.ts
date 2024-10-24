import { Controller, Post, Body, Get, Patch, Param, Delete } from '@nestjs/common';
import { TagService } from './tags.service';
import { TagDto } from './tags.dto';
import { Tag } from './tags.entity';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}


@Get()
async findAll(): Promise<Tag[]> {
    return this.tagService.findAll();
  }

  @Post()
  create(@Body() tagDto: TagDto) {
    return this.tagService.create(tagDto);
  }
}


