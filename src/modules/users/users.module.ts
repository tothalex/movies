import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { User, UserSchema } from '~modules/users/users.schema'
import { UsersService } from '~modules/users/users.service'
import { UsersController } from '~modules/users/users.controller'

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
