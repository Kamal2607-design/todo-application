// backend/src/auth/auth.controller.ts

import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto):  Promise<{ message: string; user: any }> {
    const user = await this.authService.validateUser(loginDto.mobile, loginDto.password);
    if (!user) {
      throw new BadRequestException('Invalid mobile or password');
    }

    return {
      message: 'Login successful',
      user,
    };
  }
}
