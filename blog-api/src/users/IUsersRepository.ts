import { UserEntity } from './Entities/UserEntity'
import { CreateUserDataDto } from './Dto/CreateUserDataDto'
import { DeleteResult } from 'typeorm'

export interface IUsersRepository {
  save(userData: CreateUserDataDto): Promise<UserEntity>

  create(userData: CreateUserDataDto): UserEntity

  findByEmail(username: string): Promise<UserEntity | null>

  findById(id: string): Promise<UserEntity | null>

  find(): Promise<UserEntity[]>

  deleteById(id: number): Promise<DeleteResult>
}
