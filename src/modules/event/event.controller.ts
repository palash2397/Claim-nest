import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
  Get,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EventService } from './event.service';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { IdParamDto } from './dto/id-param.dto';
import { FilterEventDto } from './dto/filter-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateEventDto) {
    return this.eventService.create(dto);
  }

  @Patch('/update')
  @UseGuards(JwtAuthGuard)
  update(@Body() dto: UpdateEventDto, @Req() req: any) {
    return this.eventService.update(dto, req.user.id);
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.eventService.findAll();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param() params: IdParamDto) {
    return this.eventService.findOne(params.id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  delete(@Param() params: IdParamDto) {
    return this.eventService.delete(params.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findByFilter(@Query() query: FilterEventDto) {
    return this.eventService.findByFilter(query);
  }
}
