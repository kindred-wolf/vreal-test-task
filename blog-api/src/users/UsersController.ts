import {
  Controller,
  Delete,
  Get,
  Param,
  UseGuards,
  Request,
  Put,
  Body,
  ForbiddenException,
} from '@nestjs/common'
import { UsersService } from './UsersService'
import { JwtAuthGuard } from 'src/common/guards/JwtAuthGuard'
import { Roles } from 'src/common/decorators/RolesDecorator'
import { UserRole } from './Entities/UserRoleEnum'
import { RolesGuard } from 'src/common/guards/RolesGuard'
import { CreateUserDataDto } from './Dto/CreateUserDataDto'
import { UpdateUserDataDto } from './Dto/UpdateUserDataDto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async getAllUsers() {
    return await this.usersService.getUsers()
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @Get(':id')
  async getUserById(@Param('id') id: string, @Request() req) {
    if (id != req.user.id && req.user.role !== UserRole.ADMIN) {
      throw new ForbiddenException()
    }
    return await this.usersService.getUserById(id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Request() req,
    @Body() updatedUser: UpdateUserDataDto,
  ) {
    console.clear()
    console.log('id: ' + id + '\nreq: ' + req.user.id)
    if (id != req.user.id && req.user.role !== UserRole.ADMIN) {
      throw new ForbiddenException()
    }
    return await this.usersService.updateUser(id, updatedUser)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUser(@Request() req) {
    return await this.usersService.deleteUserById(req.user.id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async deleteUserById(@Param('id') id: number) {
    return await this.usersService.deleteUserById(id)
  }
}
