import { Controller, Post, Body, UseGuards, Req, Patch, Param } from '@nestjs/common';
import { ContactService } from './contact.service';
import type { Request } from 'express';

import { IdParamDto } from './dto/id-param.dto';
import {CreateContactDto} from './dto/create-contact.dto';
import {UpdateContactDto} from './dto/update-contact.dto';



import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';



@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post("/create")
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateContactDto, @Req() req: Request) {
    return this.contactService.create(dto, req.user.id);
  }

   @Patch("/update")
  @UseGuards(JwtAuthGuard)
  async update(@Body() dto: UpdateContactDto, @Req() req: Request) {
    return this.contactService.update(dto, req.user.id);
  }
}
