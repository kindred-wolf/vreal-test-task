import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from './Entities/UserEntity'
import { CreateUserDataDto } from './Dto/CreateUserDataDto'
import { IUsersRepository } from './IUsersRepository'
import { UpdateUserDataDto } from './Dto/UpdateUserDataDto'

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async save(userData: UserEntity): Promise<UserEntity> {
    return await this.usersRepository.save(userData)
  }

  create(userData: CreateUserDataDto): UserEntity {
    const newUser = this.usersRepository.create(userData)
    return newUser
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.usersRepository.findOne({
      where: { email },
    })
  }

  async findById(id: string): Promise<UserEntity | null> {
    return await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'posts')
      .where('user.id = :id', { id })
      .getOne()
  }

  async find() {
    return await this.usersRepository.find()
  }

  async updateById(id: string, userData: UpdateUserDataDto) {
    return await this.usersRepository.update(id, userData)
  }

  async deleteById(id: number) {
    return await this.usersRepository.delete(id)
  }
}
