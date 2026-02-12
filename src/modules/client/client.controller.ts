import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
  Patch,
  Get,
  UseInterceptors,
  UploadedFile,
  Delete,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

import { ClientService } from './client.service';

import { IdParamDto } from './dto/client-param.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Patch('/update')
  @UseGuards(JwtAuthGuard)
  update(@Body() dto: UpdateClientDto) {
    return this.clientService.update(dto);
  }


  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  delete(@Param() dto: IdParamDto) {
    return this.clientService.delete(dto.id);
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  all() {
    return this.clientService.all();
  }

  @Get('/by-id/:id')
  @UseGuards(JwtAuthGuard)
  clientById(@Param() dto: IdParamDto) {
    return this.clientService.clientById(dto.id);
  }

}
