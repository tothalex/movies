import { Injectable, HttpService } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { startOfMonth, endOfMonth } from 'date-fns'

import { Movies } from '~modules/movies/movies.schema'
import { AuthenticatedUser } from '~types/request'
import { config } from '~utils/config'
import { omdbApiUrl } from '~utils/api'
import { MovieDto } from '~modules/movies/movies.dto'

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movies.name) private moviesModel: Model<Movies>, private httpService: HttpService) {}

  async getMovies(user: string): Promise<Movies[]> {
    return this.moviesModel.find({ user }).exec()
  }

  async getMoviesCreatedInCurrentMonth(user: string): Promise<Movies[]> {
    return this.moviesModel.find({ user, createdAt: { $gte: startOfMonth(new Date()).toString(), $lte: endOfMonth(new Date()).toString() } }).exec()
  }

  async createMovie(authenticatedUser: AuthenticatedUser, title: string): Promise<MovieDto> {
    try {
      const { data } = await this.httpService
        .get(omdbApiUrl, {
          params: {
            apikey: config.omdbApiKey,
            t: title,
          },
        })
        .toPromise()
      if (data.Response === 'False') {
        throw new Error(data.Error)
      }

      const createdMovie = await new this.moviesModel({
        user: authenticatedUser.id,
        title: data.Title,
        released: new Date(data.Released),
        genre: data.Genre,
        director: data.Director,
      }).save()
      return { title: createdMovie.title, released: createdMovie.released, director: createdMovie.director, genre: createdMovie.genre }
    } catch (err) {
      throw new Error(err.Error)
    }
  }
}
