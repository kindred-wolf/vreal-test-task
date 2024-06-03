import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthController } from './AuthController'
import { AuthService } from './AuthService'
import { JwtStrategy } from './JwtStrategy'

import { UserEntity } from '../users/Entities/UserEntity'
import { CreateUserDataDto } from '../users/Dto/CreateUserDataDto'
import { UsersRepository } from '../users/UsersRepository'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({ secret: process.env.JWT_SIGN_SECRET }),
    }),
    TypeOrmModule.forFeature([UserEntity]),
    CreateUserDataDto,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, JwtStrategy],
})
export class AuthModule {}
