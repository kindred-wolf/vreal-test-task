import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { UserEntity } from './Entities/UserEntity'
import { CreateUserDataDto } from './Dto/UserDataDto'
import { IUsersRepository } from './IUsersRepository'
import { InjectRepository } from '@nestjs/typeorm'

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

  async findByEmail(username: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({
      where: { email: username },
    })
  }

  async findById(id: string): Promise<UserEntity> {
    // const { password, ...result } = await this.usersRepository.findOne({where: {id: id}})
    // return result
    return await this.usersRepository.findOne({where: {id: id}})
  }

  async find() {
    return await this.usersRepository.find()
  }

  async deleteById(id: number){
    await this.usersRepository.delete(id)
  }
}
