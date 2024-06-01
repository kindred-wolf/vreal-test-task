import { Module } from "@nestjs/common"
import { PostsController } from './PostsController';
import { PostsService } from './PostsService';
import { PostEntity } from "./Entities/PostEntity"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PostsRepository } from "./PostsRepository"
import { PostDto } from "./DTO/PostDto"

@Module({
    imports: [TypeOrmModule.forFeature([PostEntity]), PostDto],
    controllers: [PostsController],
    providers: [PostsService, PostsRepository]
})
export class PostsModule {}