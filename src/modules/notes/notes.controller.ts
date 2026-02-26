import { Controller, Get, Param, Post, UseGuards, Body, Req } from '@nestjs/common';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';


import { CreateNoteDto } from './dto/create-note.dto';

@Controller('case/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post("/create")
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateNoteDto, @Req() req: any) {
    console.log(req.body);
    return this.notesService.create(dto, req.user.id);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }
}

