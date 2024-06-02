import { Module } from '@nestjs/common';
import { PostsModule } from './posts/PostsModule'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/DatabaseModule'
import { AuthModule } from './auth/AuthModule'
import { UsersModule } from './users/UsersModule'

@Module({
  imports: [
    PostsModule, 
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
