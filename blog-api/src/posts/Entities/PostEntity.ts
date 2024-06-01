import { UserEntity } from "src/users/Entity/UserEntity"
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