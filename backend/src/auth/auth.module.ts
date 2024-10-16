import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/user.module'; // Import UserModule to use the UserService

@Module({
  imports: [UserModule],  // Import UserModule here to access the UserService
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
