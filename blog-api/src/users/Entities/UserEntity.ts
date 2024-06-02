import { PostEntity } from 'src/posts/Entities/PostEntity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id?: string

  @Column({ unique: true })
  public email: string

  @Column()
  public password: string

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[]
}
