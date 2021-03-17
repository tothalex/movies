import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as argon2 from 'argon2'

import { User } from '~modules/users/users.schema'
import { CreateUseDto, UserDto } from '~modules/users/users.dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUseDto): Promise<UserDto> {
    const userExists = (await this.userModel.findOne({ username: createUserDto.username })) !== null
    if (userExists) {
      throw new Error('Username has been already taken.')
    }

    const createdUser = await new this.userModel({
      username: createUserDto.username,
      password: await argon2.hash(createUserDto.password),
      role: createUserDto.role,
    }).save()
    return { id: createdUser.id, username: createdUser.username, role: createdUser.role }
  }

  async findUserById(id: string): Promise<UserDto> {
    const user = await this.userModel.findOne({ id })
    return { id: user.id, username: user.username, role: user.role }
  }
}
