import { Controller, Post, Body, UseGuards, Req, Patch, Param, Delete, Get } from '@nestjs/common';
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

  @Delete("/delete/:id")
  @UseGuards(JwtAuthGuard)
  async delete(@Param() param: IdParamDto) {
    return this.contactService.delete(param.id);
  }

  @Get("/all")
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.contactService.findAll();
  }

  @Get("/:id")
  @UseGuards(JwtAuthGuard)
  async findOne(@Param() param: IdParamDto) {
    return this.contactService.findOne(param.id);
  }
}
