import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDataDto {
  @ApiProperty({
    type: [String],
  })
  username: string

  @ApiProperty({
    type: [String],
  })
  password: string
}
