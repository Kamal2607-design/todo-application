import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  mobile: string;

  @Column()
  gender: string;

  @Column()
  country: string;

  @Column("simple-array")
  hobbies: string[];

  @Column()
  email: string;

  @Column()
  password: string;
}
