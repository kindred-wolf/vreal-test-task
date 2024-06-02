import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDataDto } from '../users/Dto/UserDataDto'
import { UserEntity } from '../users/Entities/UserEntity'
import { UsersRepository } from '../users/UsersRepository'
import * as bcrypt from 'bcrypt';
import PostgresErrorCode from '../database/PostgresErrorCode.enum';
import { JwtPayload } from './JwtPayloadInterface'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(userData: CreateUserDataDto) {
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    try {
      var newUser = this.authRepository.create({
        ...userData,
        password: hashedPassword,
      })
      await this.authRepository.save(newUser)
      newUser.password = undefined
      return newUser
    } catch (error) {
      if (error?.code ===  PostgresErrorCode.UniqueViolation) {
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
    var user = await this.authRepository.findByEmail(
      payload.email,
    )

    if (!user) {
      console.log("No user with such email")
      return null
    }

    if (bcrypt.compare(payload.password, user.password)) {
      console.log('validated')
      return user
    }

    console.log('Wrong password')
  }
  
  async login(user: CreateUserDataDto) {
    var userDB = await this.authRepository.findByEmail(
      user.email,
    )

    if (!user) {
      console.log("No user with such email")
      return null
    }

    if (!bcrypt.compare(user.password, userDB.password)) {
      console.log('Passwords don\'t match')
      return null
    }

    const payload: JwtPayload = { email: user.email, password: user.password };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
