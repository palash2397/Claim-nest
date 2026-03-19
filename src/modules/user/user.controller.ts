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

  // @Get('auth/microsoft')
  // @UseGuards(AuthGuard('microsoft'))
  // async microsoftLogin() {}

  @Get('auth/microsoft')
  async microsoftLogin(@Req() req: any, @Res() res: any) {
    // 🔥 FORCE SESSION CREATION
    req.session.oauth = 'microsoft';

    console.log('SESSION CREATED:', req.sessionID);

    // 🔥 manually call passport
    return new Promise((resolve, reject) => {
      const passport = require('passport');

      passport.authenticate('microsoft')(req, res, (err) => {
        if (err) {
          console.log('AUTH ERROR:', err);
          return reject(err);
        }
        resolve(true);
      });
    });
  }

  @Get('auth/microsoft/callback')
  @UseGuards(AuthGuard('microsoft'))
  async microsoftCallback(@Req() req: Request, @Res() res: Response) {
    console.log('USER:', req.user);

    if (!req.user) {
      return res.status(401).json({ message: 'Microsoft auth failed' });
    }
    return this.userService.handleMicrosoftLogin(req.user, res);
  }
}
