import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../auth/roles/roles.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateTaskDto, @Req() req: Request) {
    return this.taskService.create(dto, req.user!.id);
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.taskService.findAll();
  }

  @Patch('/update')
  @UseGuards(JwtAuthGuard)
  update(@Body() dto: UpdateTaskDto, @Req() req: Request) {
    return this.taskService.update(dto, req.user!.id);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.taskService.taskById(id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }


  @Get('/recent/dashboard')
  @UseGuards(JwtAuthGuard)
  recentTasks() {
    return this.taskService.recentTasks();
  }
}
