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

  async getPost(post_id: string) {
    const post = this.postRepo.findOne({ where: { post_id, visible: true } });
    return post;
  }

  async updatePost(postId, updatePostDto) {
    const updateInfo = { ...updatePostDto, updatedOn: new Date() };
    this.postRepo.update({ post_id: postId }, updateInfo);
  }

  async deletePost(postId) {
    this.postRepo.delete({ post_id: postId });
    const deletedAt = new Date();
    return { success: true, post_title: postId, deletedAt };
  }
}
