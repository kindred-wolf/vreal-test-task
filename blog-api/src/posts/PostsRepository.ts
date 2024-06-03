import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { DeleteResult, Repository } from 'typeorm'

import { UserEntity } from 'users/Entities/UserEntity'

import { PostEntity } from './Entities/PostEntity'
import { PostDto } from './DTO/PostDto'

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>,
  ) {}

  async getAllPosts(): Promise<PostEntity[]> {
    return await this.postsRepository.find()
  }

  async getAllUserPosts(userId: number): Promise<PostEntity[]> {
    return await this.postsRepository.find({ where: { user: { id: userId } } })
  }

  async getPostByID(id: number): Promise<PostEntity | null> {
    const post = await this.postsRepository.findOne({
      where: { id },
    })

    return post
  }

  async getPostWithUser(id: number): Promise<PostEntity | null> {
    const post = await this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'users')
      .where('post.id = :id', { id })
      .getOne()
    return post
  }

  async createPost(post: PostDto, user: UserEntity): Promise<PostEntity> {
    const newPost = await this.postsRepository.create({ ...post, user })
    await this.postsRepository.save(newPost)
    return newPost
  }

  async updatePost(id: number, post: PostDto): Promise<PostEntity | null> {
    await this.postsRepository.update(id, post)
    return await this.getPostByID(id)
  }

  async deletePost(id: number): Promise<DeleteResult> {
    return await this.postsRepository.delete({ id: id })
  }
}
