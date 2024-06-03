import { ApiBody } from '@nestjs/swagger'
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
import { JwtAuthGuard } from 'common/guards/JwtAuthGuard'
import { RolesGuard } from 'common/guards/RolesGuard'
import { Roles } from 'common/decorators/RolesDecorator'
import { verifyOwnUser } from 'common/ownUserVerifier'

import { UserRole } from './Entities/UserRoleEnum'
import { UsersService } from './UsersService'
import { UpdateUserDataDto } from './Dto/UpdateUserDataDto'
import { BaseUserEntity } from './Entities/UserEntity'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  public async getAllUsers() {
    return await this.usersService.getUsers()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async getUserById(
    @Param('id') id: string,
    // @todo find out what type to use for req
    @Request() req: { user: BaseUserEntity },
  ) {
    if (!verifyOwnUser(parseInt(id, 10), req.user)) {
      throw new ForbiddenException()
    }
    return await this.usersService.getUserById(id)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBody({ type: [UpdateUserDataDto] })
  public async updateUser(
    @Param('id') id: string,
    @Request() req: { user: BaseUserEntity },
    @Body() updatedUser: UpdateUserDataDto,
  ) {
    if (!verifyOwnUser(parseInt(id, 10), req.user)) {
      throw new ForbiddenException()
    }
    return await this.usersService.updateUser(id, updatedUser)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  public async deleteUser(@Request() req: { user: BaseUserEntity }) {
    return await this.usersService.deleteUserById(req.user.id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  public async deleteUserById(@Param('id') id: number) {
    return await this.usersService.deleteUserById(id)
  }
}
