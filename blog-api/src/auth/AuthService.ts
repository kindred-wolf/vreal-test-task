import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { CreateUserDataDto } from '../users/Dto/CreateUserDataDto'
import { UserEntity } from '../users/Entities/UserEntity'
import { UsersRepository } from '../users/UsersRepository'
import * as bcrypt from 'bcrypt'
import PostgresErrorCode from '../database/PostgresErrorCode.enum'
import { JwtPayload } from './JwtPayloadInterface'
import { JwtService } from '@nestjs/jwt'
import { UserCredentialsDto } from 'users/Dto/UserCredentialsDto'

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(userData: CreateUserDataDto) {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds)
    try {
      const newUser = this.authRepository.create({
        ...userData,
        password: hashedPassword,
      })

      await this.authRepository.save(newUser)

      const payload: JwtPayload = {
        email: newUser.email,
      }

      return {
        accessToken: this.jwtService.sign(payload),
      }
    } catch (error) {
      if (error?.code === PostgresErrorCode.UNIQUE_VIOLATION) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        )
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async authenticateUser(payload: JwtPayload): Promise<UserEntity | null> {
    const user = await this.authRepository.findByEmail(payload.email)

    if (!user) {
      return null
    }

    return user
  }

  async login(user: UserCredentialsDto) {
    const userDB = await this.authRepository.findByEmail(user.email)

    if (!userDB) {
      throw new BadRequestException()
    }

    const compare = await bcrypt.compare(user.password, userDB.password)
    if (!compare) {
      throw new BadRequestException()
    }

    const payload: JwtPayload = { email: user.email }
    return {
      accessToken: this.jwtService.sign(payload),
    }
  }
}
