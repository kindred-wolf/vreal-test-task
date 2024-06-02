import { Module } from '@nestjs/common'
import { AuthController } from './AuthController'
import { AuthService } from './AuthService'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../users/Entities/UserEntity'
import { CreateUserDataDto } from '../users/Dto/CreateUserDataDto'
import { UsersRepository } from '../users/UsersRepository'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './JwtStrategy'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret:
        '1439ab2ad807950ea914ebf13b973f84bb00be7e1606cb65ce02cc0f4b93feb9',
    }),
    TypeOrmModule.forFeature([UserEntity]),
    CreateUserDataDto,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, JwtStrategy],
})
export class AuthModule {}
