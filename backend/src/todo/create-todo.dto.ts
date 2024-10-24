import { IsString, Matches, IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!\d+$)[a-zA-Z0-9\s.,'-]+$/, { message: 'Task Name should not be just numbers' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!\d+$)[a-zA-Z0-9\s.,'-]+$/, { message: 'Description should not be just numbers' })
  description: string;
  
  @IsString()
  @IsNotEmpty()
  time: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
