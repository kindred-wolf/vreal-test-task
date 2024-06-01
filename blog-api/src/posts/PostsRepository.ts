import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { PostEntity } from './Entities/PostEntity'
import { PostDto } from './DTO/PostDto'

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>,
  ) {}

  async getAllPosts(): Promise<PostEntity[] | undefined> {
    return await this.postsRepository.find()
  }

  async getPostByID(id: number): Promise<PostEntity | undefined> {
    const post = await this.postsRepository.findOne({
      where: { id: id },
    })
    return post || null
  }

  async createPost(post: PostDto): Promise<PostEntity> {
    const newPost = await this.postsRepository.create(post)
    await this.postsRepository.save(newPost)
    return newPost
  }

  async deletePost(id: number): Promise<DeleteResult> {
    return await this.postsRepository.delete({
      id: id,
    })
  }
}
