import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Res,
  Req,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import passport from 'passport';

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

  @Get('/profile/my')
  @UseGuards(JwtAuthGuard, RoleGuard)
  getById(@Req() req: any) {
    return this.userService.getById(req.user.id);
  }

  // @Get('auth/microsoft')
  // @UseGuards(AuthGuard('microsoft'))
  // async microsoftLogin() {}

  // @Get('auth/microsoft')
  //  @UseGuards(AuthGuard('microsoft'))
  // async microsoftLogin(@Req() req: any, @Res() res: any) {
  //   req.session.oauth = 'microsoft';
  //    console.log('SESSION BEFORE REDIRECT:', req.session);

  //   req.session.save((err: any) => {
  //     if (err) {
  //       console.log('SESSION SAVE ERROR:', err);
  //       return res.status(500).send('Session error');
  //     }

  //     passport.authenticate('microsoft')(req, res);
  //   });
  // }

  // @Get('auth/microsoft/callback')
  // // @UseGuards(AuthGuard('microsoft'))
  // async microsoftCallback(@Req() req: Request, @Res() res: Response) {
  //   console.log('SESSION:', req.session);
  //   console.log('USER:', req.user);
  //   console.log('SESSION KEYS:', Object.keys(req.session));

  //   if (!req.user) {
  //     return res.status(401).json({ message: 'Microsoft auth failed' });
  //   }
  //   return this.userService.handleMicrosoftLogin(req.user, res);
  // }

  @Get('auth/microsoft')
  redirectToMicrosoft(@Res() res: Response) {
    return this.userService.getMicrosoftAuthUrl(res);
  }

  // 🔥 Step 2: Callback
  @Get('auth/microsoft/callback')
  async microsoftCallback(@Query('code') code: string, @Res() res: Response) {
    return this.userService.handleMicrosoftCallback(code, res);
  }
}
