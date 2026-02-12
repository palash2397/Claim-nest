import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';


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
  all() {
    return this.userService.all();
  }

  @Get('/byId/:id')
  getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }
}
