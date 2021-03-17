import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { startOfMonth, endOfMonth } from 'date-fns'

import { Movies } from '~modules/movies/movies.schema'
import { AuthenticatedUser } from '~types/request'
import { MovieDto } from '~modules/movies/movies.dto'
import { OmdbService } from '~services/omdb.service'

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movies.name) private moviesModel: Model<Movies>, private omdbService: OmdbService) {}

  async getUserMovies(user: string): Promise<Movies[]> {
    return this.moviesModel.find({ user }).exec()
  }

  async getMoviesCreatedInCurrentMonth(user: string): Promise<Movies[]> {
    return this.moviesModel.find({ user, createdAt: { $gte: startOfMonth(new Date()).toString(), $lte: endOfMonth(new Date()).toString() } }).exec()
  }

  async createMovie(authenticatedUser: AuthenticatedUser, title: string): Promise<MovieDto> {
    try {
      const movieDetails = await this.omdbService.getMovieDetails(title)

      const createdMovie = await new this.moviesModel({
        user: authenticatedUser.id,
        ...movieDetails,
      }).save()

      return { title: createdMovie.title, released: createdMovie.released, director: createdMovie.director, genre: createdMovie.genre }
    } catch (err) {
      throw new Error(err.Error)
    }
  }
}
