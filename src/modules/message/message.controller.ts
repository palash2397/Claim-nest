import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { MessageService } from './message.service';

import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get("/find/all")
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.messageService.all();
  }

  @Get('/find/:id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Patch('/update')
  @UseGuards(JwtAuthGuard)
  update(@Body() UpdateMessageDto: UpdateMessageDto) {
    return this.messageService.update(UpdateMessageDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.messageService.remove(id);
  // }
}
