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
import { UserCredentialsDto } from 'src/users/Dto/UserCredentialsDto'

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
      var newUser = this.authRepository.create({
        ...userData,
        password: hashedPassword,
      })
      
      await this.authRepository.save(newUser)

      const payload: JwtPayload = {
        email: newUser.email,
        password: newUser.password,
      }
      return {
        accessToken: this.jwtService.sign(payload),
      }
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
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

  async authenticateUser(payload: JwtPayload): Promise<UserEntity> {
    var user = await this.authRepository.findByEmail(payload.email)

    if (!user) {
      console.log('No user with such email')
      return null
    }

    if (await bcrypt.compare(payload.password, user.password)) {
      console.log('validated')
      return user
    }

    console.log('Wrong password')
  }

  async login(user: UserCredentialsDto) {
    var userDB = await this.authRepository.findByEmail(user.email)

    if (!userDB) {
      console.log('No user with such email')
      throw new BadRequestException()
    }

    const compare = await bcrypt.compare(user.password, userDB.password)
    if (!compare) {
      console.log("Passwords don't match")
      throw new BadRequestException()
    }

    const payload: JwtPayload = { email: user.email, password: user.password }
    return {
      accessToken: this.jwtService.sign(payload),
    }
  }
}
