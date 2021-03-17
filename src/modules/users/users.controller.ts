import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common'

import { UsersService } from '~modules/users/users.service'
import { CreateUseDto } from '~modules/users/users.dto'
import { ValidationPipe } from '~pipes/validation.pipe'

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUseDto): Promise<{ id: string; username: string }> {
    try {
      const user = await this.usersService.createUser(createUserDto)
      return user
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
