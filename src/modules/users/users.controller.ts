import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common'

import { UsersService } from '~modules/users/users.service'
import { CreateUseDto, UserDto } from '~modules/users/users.dto'
import { ValidationPipe } from '~pipes/validation.pipe'

/**
 * Users Controller
 */
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * Create user
   * @param createUserDto User credentials
   * @returns Returns created user
   */
  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUseDto): Promise<UserDto> {
    try {
      const user = await this.usersService.createUser(createUserDto)
      return user
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
