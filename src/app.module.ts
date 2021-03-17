import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UsersModule } from '~modules/users/users.module'
import { AuthModule } from '~modules/auth/auth.module'
import { MoviesModule } from '~modules/movies/movies.module'
import { config } from '~utils/config'
import { ServicesModule } from '~services/services.module'

@Module({
  imports: [MongooseModule.forRoot(config.mongo), UsersModule, MoviesModule, AuthModule, ServicesModule],
  controllers: [],
})
export class AppModule {}
