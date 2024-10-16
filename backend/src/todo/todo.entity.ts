// todo.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todo')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  time: string;

  @Column()
  status: string;
}
