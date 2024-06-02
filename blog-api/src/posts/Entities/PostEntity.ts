import { UserEntity } from "src/users/Entities/UserEntity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity('posts')
export class PostEntity {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public title: string

    @Column()
    public content: string

    @ManyToOne(() => UserEntity, user => user.posts)
    user: UserEntity;
}