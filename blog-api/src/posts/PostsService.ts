import { Injectable } from '@nestjs/common'
import { DeleteResult } from 'typeorm'
import { UserEntity } from 'users/Entities/UserEntity'
import { PostEntity } from './Entities/PostEntity'
import { PostsRepository } from './PostsRepository'
import { PostDto } from './DTO/PostDto'

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async getAllPosts(): Promise<PostEntity[]> {
    return await this.postsRepository.getAllPosts()
  }

  async getAllUserPosts(userId: number): Promise<PostEntity[]> {
    return await this.postsRepository.getAllUserPosts(userId)
  }

  async getPostByID(id: number): Promise<PostEntity | null> {
    const post = await this.postsRepository.getPostByID(id)
    return post ?? null
  }

  async createPost(post: PostDto, user: UserEntity): Promise<PostEntity> {
    return await this.postsRepository.createPost(post, user)
  }

  async updatePost(id: number, post: PostDto): Promise<PostEntity | null> {
    return await this.postsRepository.updatePost(id, post)
  }

  async deletePost(id: number): Promise<DeleteResult> {
    return await this.postsRepository.deletePost(id)
  }
}
