import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  Query,
  ForbiddenException,
} from '@nestjs/common'
import { PostsService } from './PostsService'
import { PostDto } from './DTO/PostDto'
import { JwtAuthGuard } from 'src/common/guards/JwtAuthGuard'
import { RolesGuard } from 'src/common/guards/RolesGuard'
import { UserRole } from 'src/users/Entities/UserRoleEnum'
import { Roles } from 'src/common/decorators/RolesDecorator'

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  async getAllPosts(@Query('user_id') userId: string) {
    if (userId) {
      return await this.postService.getAllUserPosts(parseInt(userId, 10))
    }
    return await this.postService.getAllPosts()
  }

  @Get('/:id')
  async getPostByID(@Param('id') id) {
    const post = await this.postService.getPostByID(id)
    
    if(!post){
      throw new NotFoundException()
    }

    return post
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Body() post: PostDto, @Request() req) {
    const user = req.user
    return this.postService.createPost(post, user)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @Put('/:id')
  async updatePost(@Param('id') id: number, @Body() post: PostDto, @Request() req){
    if(id != req.user.id && req.user.role !== UserRole.ADMIN){
        throw new ForbiddenException()
    }
    return await this.postService.updatePost(id, post)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @Delete('/:id')
  async deletePost(@Param('id') id: number, @Request() req){
    if(id != req.user.id && req.user.role !== UserRole.ADMIN){
        throw new ForbiddenException()
    }
    return await this.postService.deletePost(id)
  }
}
