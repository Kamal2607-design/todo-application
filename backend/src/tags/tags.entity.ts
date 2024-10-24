import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags')
export class Tag{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable:true})
  age: number;

  @Column({nullable:true})
  interest: string;
}