import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/createPost.dto';
import { UpdatePostDto } from './dtos/updatePost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async getAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async createPost(post: CreatePostDto) {
    const newPost = this.postsRepository.create(post);
    return await this.postsRepository.save(newPost);
  }

  async replacePost(id: number, post: UpdatePostDto) {
    const existingPost = await this.postsRepository.findOne({ where: { id } });
    if (!existingPost) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    // replace: overwrite everything
    await this.postsRepository.update(id, post);
    return this.postsRepository.findOne({ where: { id } });
  }

  async deletePost(id: number) {
    const result = await this.postsRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return { deleted: true };
  }
}
