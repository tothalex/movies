import { Controller, Post, Body, BadRequestException } from '@nestjs/common'

import { AuthLoginDto } from '~modules/auth/auth.dto'
import { AuthService } from '~modules/auth/auth.service'
import { ValidationPipe } from '~pipes/validation.pipe'

/**
 * Authentication Controller
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Get authentication token
   * @param authLoginDto Authentication credentials
   * @returns Returns created authentication token
   */
  @Post('login')
  async login(@Body(new ValidationPipe()) authLoginDto: AuthLoginDto): Promise<string> {
    try {
      if (!(await this.authService.validateUser(authLoginDto))) {
        throw new BadRequestException('invalid-password')
      }
      return this.authService.signToken(authLoginDto.username)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
