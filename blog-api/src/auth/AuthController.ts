import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDataDto } from '../users/Dto/CreateUserDataDto'
import { AuthService } from './AuthService'
import { UserCredentialsDto } from 'src/users/Dto/UserCredentialsDto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    async registerUser(@Body() userData: CreateUserDataDto){
        return await this.authService.registerUser(userData)
    }

    @Post('login')
    async login(@Body() userData: UserCredentialsDto){
        return await this.authService.login(userData)
    }
}
