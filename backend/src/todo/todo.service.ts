import { Injectable, NotFoundException,InternalServerErrorException } from '@nestjs/common';
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

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      const todo = this.todoRepository.create(createTodoDto);
      return await this.todoRepository.save(todo);  // Ensure successful save to the DB
    } catch (error) {
      console.error('Error saving To-Do to the database:', error);  // Log the error
      throw new InternalServerErrorException('Failed to save To-Do');
    }
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
async findAllPaginated(page: number, limit: number): Promise<{ data: Todo[], lastPage: number }> {
  page = isNaN(page) || page < 1 ? 1 : page; 
  limit = isNaN(limit) || limit < 1 ? 5 : limit; 
  
  const [result, total] = await this.todoRepository
    .createQueryBuilder('todo')
    .skip((page - 1) * limit)  
    .take(limit)  
    .getManyAndCount();
    
  return {
    data: result,
    lastPage: Math.ceil(total / limit)
  };
}




}
