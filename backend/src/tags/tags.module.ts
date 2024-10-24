import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from './tags.controller';
import { TagService } from './tags.service';
import { Tag } from './tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}