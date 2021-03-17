import { Module, HttpModule, Global } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Movies, MoviesSchema } from '~modules/movies/movies.schema'

import { MoviesController } from '~modules/movies/movies.controller'
import { MoviesService } from '~modules/movies/movies.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Movies.name, schema: MoviesSchema }]), HttpModule],
  providers: [MoviesService],
  controllers: [MoviesController],
  exports: [MoviesService],
})
export class MoviesModule {}
