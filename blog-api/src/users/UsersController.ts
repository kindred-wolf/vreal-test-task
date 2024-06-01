import { Controller, Delete, Get, Param } from "@nestjs/common"
import { UsersService } from "./UsersService"

@Controller('users')
export class UsersController{
    constructor(private readonly usersService: UsersService){}

    @Get()
    async getAllUsers(){
        return await this.usersService.getUsers()
    }

    @Get(':id')
    async getUserById(@Param('id') id: string){
        return await this.usersService.getUserById(id)
    }

    @Delete(':id')
    async deleteUserById(@Param('id') id: number){
        await this.usersService.deleteUserById(id)
    }
}