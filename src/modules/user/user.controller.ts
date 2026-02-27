import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';

import type { Request, Response } from 'express';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../auth/roles/roles.guard';

import { AuthGuard } from '@nestjs/passport';

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

  @Get('auth/microsoft')
  @UseGuards(AuthGuard('microsoft'))
  async microsoftLogin() {}

  @Get('auth/microsoft/callback')
  @UseGuards(AuthGuard('microsoft'))
  async microsoftCallback(@Req() req: Request, @Res() res: Response) {
    return this.userService.handleMicrosoftLogin(req.user, res);
  }
}
