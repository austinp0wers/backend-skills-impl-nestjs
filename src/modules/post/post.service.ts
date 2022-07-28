import { PostEntity } from '../../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardPostDto } from '../post/dto/createBoardDto';

export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepo: Repository<PostEntity>,
  ) {}

  async createPost(createPostDto: CreateBoardPostDto) {
    try {
      await this.postRepo.insert(createPostDto);
    } catch (err) {
      throw new Error('insert failed');
    }
    return 'OK';
  }

  async getPostList() {
    const boardList = await this.postRepo.find();
    return boardList;
  }

  async getPost(id) {
    this.postRepo.findOne(id);
  }

  async updatePost(postId, updatePostDto) {
    this.postRepo.update({ post_id: postId }, updatePostDto);
  }

  async deletePost(postId) {
    this.postRepo.delete({ post_id: postId });
  }
}
