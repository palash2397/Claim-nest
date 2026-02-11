import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task.schema';

import { CaseModule } from '../case/case.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]), CaseModule, UserModule],
  exports: [TaskService, MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
})
export class TaskModule {}
