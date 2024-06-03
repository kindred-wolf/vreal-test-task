import { Injectable } from '@nestjs/common'
import { UsersRepository } from './UsersRepository'
import { UpdateUserDataDto } from './Dto/UpdateUserDataDto'
import * as bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

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
    const hashedUserData = new UpdateUserDataDto({
      ...userData,
      password: await bcrypt.hash(userData.password, SALT_ROUNDS),
    })

    return await this.usersRepository.updateById(id, hashedUserData)
  }

  async deleteUserById(id: number) {
    return await this.usersRepository.deleteById(id)
  }
}
