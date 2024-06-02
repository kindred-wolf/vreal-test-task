import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDataDto } from '../users/Dto/UserDataDto'
import { AuthService } from './AuthService'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    async registerUser(@Body() userData: CreateUserDataDto){
        return await this.authService.registerUser(userData)
    }

    @Post('login')
    async login(@Body() userData: CreateUserDataDto){
        return await this.authService.login(userData)
    }
}
