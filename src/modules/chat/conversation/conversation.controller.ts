import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt/jwt-auth.guard';
import type { Request } from 'express';
import { Param } from '@nestjs/common';


@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @UseGuards(JwtAuthGuard)
  @Post("/direct/:userId")
  create(@Req() req: Request, @Param('userId') userId: string) {
    return this.conversationService.createDirect(req.user.id, userId);
  }
}
