import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from './UsersController'
import { UserEntity } from './Entities/UserEntity'
import { UsersService } from './UsersService'
import { CreateUserDataDto } from './Dto/CreateUserDataDto'
import { UsersRepository } from './UsersRepository'
import { UpdateUserDataDto } from './Dto/UpdateUserDataDto'
import { UserCredentialsDto } from './Dto/UserCredentialsDto'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    CreateUserDataDto,
    UpdateUserDataDto,
    UserCredentialsDto,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
