import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/Entities/UserRoleEnum';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);