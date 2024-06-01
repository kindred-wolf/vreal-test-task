import { UserEntity } from './Entity/UserEntity'
import { UserDataDto } from './Dto/UserDataDto'

export interface IUsersRepository {

  save(userData: UserDataDto) : Promise<UserEntity>

  create(userData: UserDataDto) : UserEntity

  findByUsername(username: string) : Promise<UserEntity>

  find()

  deleteById(id: number)
}
