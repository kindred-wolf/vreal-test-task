import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersController } from "./UsersController"
import { UserEntity } from "./Entities/UserEntity"
import { UsersService } from "./UsersService"
import { CreateUserDataDto } from "./Dto/UserDataDto"
import { UsersRepository } from "./UsersRepository"

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), CreateUserDataDto],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository]
})
export class UsersModule {}