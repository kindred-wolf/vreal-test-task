import { Injectable } from '@nestjs/common'
import { PostEntity } from './Entities/PostEntity'
import { PostsRepository } from './PostsRepository'
import { DeleteResult } from 'typeorm'
import { PostDto } from './DTO/PostDto'
import { UserEntity } from 'src/users/Entities/UserEntity'

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

  async getAllUserPosts(userId: number): Promise<PostEntity[] | undefined> {
    return await this.postsRepository.getAllUserPosts(userId)
  }

  async getPostByID(id: number): Promise<PostEntity | undefined> {
    return (await this.postsRepository.getPostByID(id)) ?? null
  }

  async createPost(post: PostDto, user: UserEntity): Promise<PostEntity> {
    return await this.postsRepository.createPost(post, user)
  }

  async updatePost(id: number, post: PostDto): Promise<PostEntity> {
    return await this.postsRepository.updatePost(id, post)
  }

  async deletePost(id: number): Promise<DeleteResult> {
    return await this.postsRepository.deletePost(id)
  }
}
