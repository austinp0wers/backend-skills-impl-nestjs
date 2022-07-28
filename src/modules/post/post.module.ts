import { JwtService } from '@nestjs/jwt';
import { PostEntity } from '../../entities/post.entity';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostController],
  providers: [PostService, JwtService],
})
export class PostModule {}
