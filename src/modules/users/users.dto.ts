import { IsString, IsDefined, Length, IsIn } from 'class-validator'

export class CreateUseDto {
  @IsDefined({ message: 'not-defined' })
  @IsString({ message: 'not-string' })
  @Length(3, 20, { message: 'not-valid-length' })
  username: string

  @IsDefined({ message: 'not-defined' })
  @IsString({ message: 'not-string' })
  @Length(3, 20, { message: 'not-valid-length' })
  password: string

  @IsDefined({ message: 'not-defined' })
  @IsString({ message: 'not-string' })
  @IsIn(['basic', 'premium'])
  role: 'basic' | 'premium'
}

export class UserDto {
  id: string
  username: string
}
