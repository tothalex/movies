import { Module, HttpModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Movies, MoviesSchema } from '~modules/movies/movies.schema'
import { MoviesController } from '~modules/movies/movies.controller'
import { MoviesService } from '~modules/movies/movies.service'
import { OmdbService } from '~services/omdb.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Movies.name, schema: MoviesSchema }]), HttpModule],
  providers: [MoviesService, OmdbService],
  controllers: [MoviesController],
  exports: [MoviesService],
})
export class MoviesModule {}
