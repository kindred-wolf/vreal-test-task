import { BaseUserEntity } from 'users/Entities/UserEntity'
import { UserRole } from 'users/Entities/UserRoleEnum'

export function verifyOwnUser(id: number, user: BaseUserEntity): boolean {
  return id === user.id || user.role === UserRole.ADMIN
}
