import { UserEntity } from './Entities/UserEntity'
import { CreateUserDataDto } from './Dto/UserDataDto'

export interface IUsersRepository {

  save(userData: CreateUserDataDto) : Promise<UserEntity>

  create(userData: CreateUserDataDto) : UserEntity

  findByEmail(username: string) : Promise<UserEntity>

  find()

  deleteById(id: number)
}
