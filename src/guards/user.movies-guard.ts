import { Injectable, CanActivate, ExecutionContext, Inject, HttpException } from '@nestjs/common'
import { MoviesService } from '~modules/movies/movies.service'

@Injectable()
export class UserMoviesGuard implements CanActivate {
  constructor(@Inject('MoviesService') private moviesService: MoviesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const { id, role } = request.user

    if (role === 'premium') {
      return true
    }

    const movies = await this.moviesService.getMoviesCreatedInCurrentMonth(id)

    if (movies.length === 5) {
      throw new HttpException('Monthly limit reached', 400)
    }

    return true
  }
}
