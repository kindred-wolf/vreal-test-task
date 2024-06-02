import { PostEntity } from 'src/posts/Entities/PostEntity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UserRole } from './UserRoleEnum'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id?: number

  @Column({ unique: true })
  public email: string
  
  @Column()
  public username: string

  @Column()
  public password: string
  
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[]
}
