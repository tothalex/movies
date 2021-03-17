import { Injectable, HttpService } from '@nestjs/common'

import { config } from '~utils/config'
import { omdbApiUrl } from '~utils/api'

@Injectable()
export class OmdbService {
  constructor(private httpService: HttpService) {}

  async getMovieDetails(title: string): Promise<{ title: string; released: Date; genre: string; director: string }> {
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
      return { title: data.Title, released: data.Released, genre: data.Genre, director: data.Director }
    } catch (err) {
      throw new Error(err.Error)
    }
  }
}
