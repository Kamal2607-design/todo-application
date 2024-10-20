import { Controller, Post, Body, Get, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './create-todo.dto';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }
  @Get()
  getAllTodos(): Promise<Todo[]> {
  return this.todoService.findAll();
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
}

