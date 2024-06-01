import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserDataDto } from '../users/Dto/UserDataDto'
import { UserEntity } from '../users/Entity/UserEntity'
import { UsersRepository } from '../users/UsersRepository'
import * as bcrypt from 'bcrypt';
import PostgresErrorCode from '../database/PostgresErrorCode.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: UsersRepository,
  ) {}

  async registerUser(userData: UserDataDto) {
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

  async authenticateUser(userData: UserDataDto): Promise<UserEntity> {
    var user = await this.authRepository.findByUsername(
      userData.username,
    )

    if (!user) {
      return null
    }

    if (bcrypt.compare(userData.password, user.password)) {
      console.log('validated')
      return user
    }

    console.log('Wrong password')
  }
}
