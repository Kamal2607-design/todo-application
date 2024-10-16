import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'users/user.entity';
import { UserController } from 'users/user.controller';
import { UserService } from 'users/user.service';
import { UserModule } from 'users/user.module';
import { AuthModule } from './auth/auth.module'; 
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Kamalesh',
      database: 'todo-app',
      entities: [User,Todo],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([User]),
    UserModule,
    AuthModule,
    TodoModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
