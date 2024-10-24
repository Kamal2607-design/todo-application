import { Controller, Post, Body, Get, Patch, Param, Delete, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './create-todo.dto';
import { Todo } from './todo.entity';
import { InternalServerErrorException } from '@nestjs/common';




@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
  try {
    console.log('Received data:', createTodoDto);  // Log the incoming request body
    return await this.todoService.create(createTodoDto);
  } catch (error) {
    console.error('Error creating To-Do:', error);  // Log error details
    throw new InternalServerErrorException('Failed to create to-do');
  }
}

  @Get(':id')
  async getTodoById(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Delete(':id')
  async deleteTodoById(@Param('id') id: string): Promise<void> {
    return this.todoService.delete(id);
  }

  @Patch(':id')
async updateTodoStatus(
  @Param('id') id: string,
  @Body('status') status: string
): Promise<Todo> {
  return this.todoService.updateStatus(id, status);
}

@Get()
getAllTodos(
  @Query('page') page: number = 1, 
  @Query('limit') limit: number = 5
): Promise<{ data: Todo[], lastPage: number }> {
  page = Number(page);  
  limit = Number(limit); 
  const todos = this.todoService.findAllPaginated(page, limit);
  return todos;
}



}

