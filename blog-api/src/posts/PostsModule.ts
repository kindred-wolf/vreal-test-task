import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from 'users/Entities/UserEntity'

import { PostsController } from './PostsController'
import { PostsService } from './PostsService'
import { PostEntity } from './Entities/PostEntity'
import { PostsRepository } from './PostsRepository'
import { PostDto } from './DTO/PostDto'

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity]), PostDto],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}
