import { Injectable } from '@nestjs/common'
import { PostEntity } from './Entities/PostEntity'
import { PostsRepository } from './PostsRepository'
import { DeleteResult } from 'typeorm'
import { PostDto } from './DTO/PostDto'

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async getAllPosts(): Promise<PostEntity[] | undefined> {
    try {
      return await this.postsRepository.getAllPosts()
    } catch (e) {
      console.log(e)
    }
  }

  async getPostByID(id: number): Promise<PostEntity | undefined> {
    try {
      return await this.postsRepository.getPostByID(id) || null
    } catch (e) {
      console.log(e)
    }
  }

  async createPost(post: PostDto): Promise<PostEntity> {
    return await this.postsRepository.createPost(post)
  }

  async deletePost(id: number): Promise<DeleteResult> {
    return await this.postsRepository.deletePost(id)
  }
}
