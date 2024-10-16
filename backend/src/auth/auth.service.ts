// backend/src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(mobile: string, password: string): Promise<any> {
    const user = await this.usersService.findByMobile(mobile);
    if (user && user.password === password) {
      // Strip password from the user object
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
