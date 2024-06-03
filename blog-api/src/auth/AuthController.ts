import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody } from '@nestjs/swagger'
import { UserCredentialsDto } from 'users/Dto/UserCredentialsDto'
import { CreateUserDataDto } from '../users/Dto/CreateUserDataDto'
import { AuthService } from './AuthService'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: [CreateUserDataDto] })
  async registerUser(@Body() userData: CreateUserDataDto) {
    return await this.authService.registerUser(userData)
  }

  @Post('login')
  @ApiBody({ type: [UserCredentialsDto] })
  async login(@Body() userData: UserCredentialsDto) {
    return await this.authService.login(userData)
  }
}
