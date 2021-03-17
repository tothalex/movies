import { IsString, IsDefined, Length } from 'class-validator'

export class CreateMovieDto {
  @IsDefined({ message: 'not-defined' })
  @IsString({ message: 'not-string' })
  @Length(1, 100, { message: 'invalid-length' })
  title: string
}

export class MovieDto {
  title: string
  released: Date
  genre: string
  director: string
}
