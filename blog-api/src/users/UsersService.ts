import { Injectable } from '@nestjs/common'
import { UsersRepository } from './UsersRepository'
import { CreateUserDataDto } from './Dto/CreateUserDataDto'
import { UpdateUserDataDto } from './Dto/UpdateUserDataDto'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(id: string) {
    return await this.usersRepository.findById(id)
  }

  async getUsers() {
    return await this.usersRepository.find()
  }

  async updateUser(id: string, userData: UpdateUserDataDto) {
    const saltRound = 10
    userData.password = await bcrypt.hash(userData.password, saltRound)
    return await this.usersRepository.updateById(id, userData)
  }

  async deleteUserById(id: number) {
    return await this.usersRepository.deleteById(id)
  }
}
