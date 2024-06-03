import { ApiBody } from '@nestjs/swagger'
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
  HttpCode,
  BadRequestException,
} from '@nestjs/common'

import { JwtAuthGuard } from 'common/guards/JwtAuthGuard'

import { PostsService } from './PostsService'
import { PostDto } from './DTO/PostDto'
import { verifyOwnUser } from 'common/ownUserVerifier'
import { BaseUserEntity } from 'users/Entities/UserEntity'

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
  async getPostByID(@Param('id') id: string) {
    const post = await this.postService.getPostByID(parseInt(id, 10))

    if (!post) {
      throw new NotFoundException()
    }

    return post
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: [PostDto] })
  // @todo find out what type to use for req
  createPost(@Body() post: PostDto, @Request() req: { user: BaseUserEntity }) {
    const user = req.user
    return this.postService.createPost(post, user)
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @ApiBody({ type: [PostDto] })
  async updatePost(
    @Param('id') id: number,
    @Body() post: PostDto,
    @Request() req: { user: BaseUserEntity },
  ) {
    if (!verifyOwnUser(id, req.user)) {
      throw new ForbiddenException()
    }

    return await this.postService.updatePost(id, post)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(204)
  // @todo find out what type to use for req
  async deletePost(
    @Param('id') id: string,
    @Request() req: { user: BaseUserEntity },
  ) {
    const idInt = parseInt(id, 10)
    if (!verifyOwnUser(idInt, req.user)) {
      throw new ForbiddenException()
    }

    const deleteResult = await this.postService.deletePost(idInt)
    if (deleteResult.affected === 0) {
      // @todo maybe use 404 instead
      throw new BadRequestException()
    }
  }
}
