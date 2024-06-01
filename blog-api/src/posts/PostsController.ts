import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common'
import { PostsService } from './PostsService'
import { PostEntity } from './Entities/PostEntity'
import { PostDto } from './DTO/PostDto'

@Controller('posts')
export class PostsController {
  constructor(
    private readonly appService: PostsService
  ) {}

  @Get()
  async getAllPosts() {
    return await this.appService.getAllPosts();
  }

  @Get('/:id')
  async getPostByID(@Param('id') id) {
    return await this.appService.getPostByID(id)
  }

  @Post()
  async createPost(@Body() post: PostDto){
    return await this.appService.createPost(post)
  }

  @Delete('/:id')
  async deletePost(@Param('id') id: number){
    return await this.appService.deletePost(id)
  }
}
