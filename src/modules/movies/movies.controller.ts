import { Controller, Get, Post, Body, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common'

import { CreateMovieDto, MovieDto } from '~modules/movies/movies.dto'
import { MoviesService } from '~modules/movies/movies.service'
import { ValidationPipe } from '~pipes/validation.pipe'
import { JwtAuthGuard } from '~guards/auth.jwt-guard'
import { AuthenticatedRequest } from '~types/request'
import { UserMoviesGuard } from '~guards/user.movies-guard'
import { Movie } from '~modules/movies/movies.schema'

/**
 * Movies Controller
 */
@Controller('movies')
@UseGuards(JwtAuthGuard)
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  /**
   * Create movie
   * @param req Request with the authentication details
   * @returns Returns created movie
   */
  @UseGuards(UserMoviesGuard)
  @Post()
  async create(@Req() req: AuthenticatedRequest, @Body(new ValidationPipe()) createMovieDto: CreateMovieDto): Promise<MovieDto> {
    try {
      const movie = await this.moviesService.createMovie(req.user, createMovieDto.title)
      return movie
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * Get movies
   * @param req Request with the authentication details
   * @returns Returns movies created by the user
   */
  @Get('/')
  async all(@Req() req: AuthenticatedRequest): Promise<Movie[]> {
    try {
      const movies = await this.moviesService.getUserMovies(req.user.id)
      return movies
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
