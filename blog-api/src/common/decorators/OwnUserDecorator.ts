import { SetMetadata } from '@nestjs/common'
import { UserRole } from 'users/Entities/UserRoleEnum'

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles)
