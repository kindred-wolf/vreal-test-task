import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserDataDto } from '../users/Dto/UserDataDto'
import { AuthService } from './AuthenticationService'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    async registerUser(@Body() userData: UserDataDto){
        return await this.authService.registerUser(userData)
    }

    @Post('login')
    async authenticateUser(@Body() userData: UserDataDto){
        return await this.authService.authenticateUser(userData)
    }
}
