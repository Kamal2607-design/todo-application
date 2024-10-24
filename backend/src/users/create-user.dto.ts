import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Mobile number is required' })
  mobile: string;

  @IsNotEmpty({ message: 'Gender is required' })
  gender: string;

  @IsNotEmpty({ message: 'Country is required' })
  country: string;

  @IsNotEmpty({ message: 'Hobbies are required' })
  hobbies: string[];

  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
