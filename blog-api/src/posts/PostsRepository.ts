import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PostEntity } from './Entities/PostEntity'
import { PostDto } from './DTO/PostDto'
import { UserEntity } from 'src/users/Entities/UserEntity'

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>,
  ) {}

  async getAllPosts(): Promise<PostEntity[] | undefined> {
    return await this.postsRepository.find()
  }

  async getAllUserPosts(userId: number): Promise<PostEntity[] | undefined> {
    return await this.postsRepository.find({ where: { user: { id: userId } } })
  }

  async getPostByID(id: number): Promise<PostEntity> {
    const post = await this.postsRepository.findOne({
      where: { id: id },
    })

    return post
  }

  async createPost(post: PostDto, user: UserEntity): Promise<PostEntity> {
    const newPost = await this.postsRepository.create(post)
    newPost.user = user
    await this.postsRepository.save(newPost)
    return newPost
  }

  async updatePost(id: number, post: PostDto): Promise<PostEntity> {
    await this.postsRepository.update(id, post)
    return await this.getPostByID(id)
  }

  async deletePost(id: number): Promise<DeleteResult> {
    return await this.postsRepository.delete({
      id: id,
    })
  }
}
