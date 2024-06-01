import { Injectable } from "@nestjs/common"
import { UsersRepository } from "./UsersRepository"

@Injectable()
export class UsersService{
    constructor(private readonly usersRepository: UsersRepository){}
    
  async getUserById(id: string) {
    return await this.usersRepository.findById(id)
  }

  async getUsers() {
    return await this.usersRepository.find()
  }

  async deleteUserById(id: number) {
    await this.usersRepository.deleteById(id)
  }
}