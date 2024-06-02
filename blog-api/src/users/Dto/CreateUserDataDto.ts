import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDataDto {
  @ApiProperty({
    type: [String],
  })
  email: string

  @ApiProperty({
    type: [String],
  })
  username: string

  @ApiProperty({
    type: [String],
  })
  password: string
}
