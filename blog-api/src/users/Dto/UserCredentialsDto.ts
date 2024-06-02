import { ApiProperty } from '@nestjs/swagger'

export class UserCredentialsDto {
  @ApiProperty({
    type: [String],
  })
  email: string

  @ApiProperty({
    type: [String],
  })
  password: string
}
