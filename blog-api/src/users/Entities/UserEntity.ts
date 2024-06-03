import { PostEntity } from 'posts/Entities/PostEntity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UserRole } from './UserRoleEnum'

export interface BaseUserEntity {
  id: number
  role: UserRole
  email: string
  username: string
  password: string
  posts: PostEntity[]
}

@Entity('users')
export class UserEntity implements BaseUserEntity {
  @PrimaryGeneratedColumn()
  public id: number
  // unique columns create an index in postgres by default
  @Column({ unique: true })
  public email: string

  @Column()
  public username: string

  @Column()
  public password: string

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[]
}
