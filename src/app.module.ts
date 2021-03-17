import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { UsersModule } from '~modules/users/users.module'
import { AuthModule } from '~modules/auth/auth.module'
import { MoviesModule } from '~modules/movies/movies.module'
import { config } from '~utils/config'

@Module({
  imports: [MongooseModule.forRoot(config.mongo), UsersModule, MoviesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
