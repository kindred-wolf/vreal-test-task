import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common'
import { PostsService } from './PostsService'
import { PostEntity } from './Entities/PostEntity'
import { PostDto } from './DTO/PostDto'
import { JwtAuthGuard } from 'src/common/guards/JwtAuthGuard'

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

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() post: PostDto){
    return await this.appService.createPost(post)
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updatePost(@Param('id') id: number, @Body() post: PostDto){
    return await this.appService.updatePost(id, post)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deletePost(@Param('id') id: number){
    return await this.appService.deletePost(id)
  }
}
