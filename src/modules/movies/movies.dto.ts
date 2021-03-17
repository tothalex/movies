import { IsString, IsDefined } from 'class-validator'

export class CreateMovieDto {
  @IsDefined({ message: 'not-defined' })
  @IsString({ message: 'not-string' })
  title: string
}

export class MovieDto {
  title: string
  released: Date
  genre: string
  director: string
}
