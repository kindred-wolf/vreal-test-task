import { Module } from '@nestjs/common';
import { AuthController } from './AuthenticationController';
import { AuthService } from './AuthenticationService';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../users/Entity/UserEntity'
import { UserDataDto } from '../users/Dto/UserDataDto'
import { UsersRepository } from '../users/UsersRepository'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UserDataDto],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository]
})
export class AuthModule {}