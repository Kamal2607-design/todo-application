export class CreateTodoDto {
    name: string;
    description: string;
    time: string;
    status: 'in-progress' | 'completed';
  }
  