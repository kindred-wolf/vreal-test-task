import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersController } from "./UsersController"
import { UserEntity } from "./Entity/UserEntity"
import { UsersService } from "./UsersService"
import { UserDataDto } from "./Dto/UserDataDto"
import { UsersRepository } from "./UsersRepository"

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), UserDataDto],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository]
})
export class UsersModule {}