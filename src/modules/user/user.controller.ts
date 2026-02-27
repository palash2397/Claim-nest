import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';

import type { Request } from 'express';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../auth/roles/roles.guard';

import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Post('/login')
  login(@Body() dto: LoginUserDto) {
    return this.userService.login(dto);
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard, RoleGuard)
  all(@Req() req: Request) {
    return this.userService.all(req.user!.id);
  }

  @Get('/byId/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }
}
