import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(todo);
  }
  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id: parseInt(id) } });
    if (!todo) {
      throw new NotFoundException('To-Do not found');
    }
    return todo;
  }

  async updateStatus(id: string, status: string): Promise<Todo> {
    const todoId = parseInt(id);  // Convert the id to a number
    const todo = await this.todoRepository.findOne({ where: { id: todoId } });
    if (!todo) throw new NotFoundException('To-Do not found');

    todo.status = status;
    await this.todoRepository.save(todo);
    return todo;
}
async delete(id: string): Promise<void> {
  const result = await this.todoRepository.delete(id);
  if (result.affected === 0) {
    throw new NotFoundException('To-Do not found');
  }
}
}
