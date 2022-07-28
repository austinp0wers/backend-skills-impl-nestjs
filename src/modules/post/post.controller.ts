import { JwtService } from '@nestjs/jwt';
import { HttpExceptionFilter } from 'src/exceptions/httpException';
import { PostService } from './post.service';
import { UpdatePostDto } from '../post/dto/updateBoardDto';
import { CreateBoardPostDto } from '../post/dto/createBoardDto';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  HttpStatus,
  Res,
  HttpCode,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { JwtStrategy } from 'src/helpers/jwt.strategy';

@Controller('post')
@UseFilters(new HttpExceptionFilter())
export class PostController {
  constructor(
    private boardService: PostService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: '계시물 등록' })
  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Headers('Authorization') authorization: any,
    @Body() createPostDto: CreateBoardPostDto,
    @Res() res: Response,
  ) {
    await this.boardService.createPost(createPostDto);
    return res.status(HttpStatus.OK).json({
      code: 200,
      msg: 'OK',
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '계시물 수정' })
  @Patch(':id')
  @HttpCode(200)
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.boardService.updatePost(id, updatePostDto);
  }

  @ApiOperation({ summary: '계시물 조회' })
  @Get(':id')
  @HttpCode(200)
  async readPost(@Param('id') id: string) {
    return this.boardService.getPost(id);
  }

  @ApiOperation({ summary: '계시물 목록 전체 조회' })
  @Get('')
  @HttpCode(200)
  async getBoardList() {
    return await this.boardService.getPostList();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '계시물 삭제' })
  @Delete(':id')
  @HttpCode(200)
  async deletePoset(@Param('id') id) {
    this.boardService.deletePost(id);
    return 'Delete Successful';
  }
}
