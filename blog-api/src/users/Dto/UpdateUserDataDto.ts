import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDataDto {
  constructor(updateUser: UpdateUserDataDto) {
    Object.assign(this, updateUser)
  }

  @ApiProperty({
    type: [String],
  })
  username: string

  @ApiProperty({
    type: [String],
  })
  password: string
}
