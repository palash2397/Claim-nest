import {
  Controller,
  Get,
  Param,
  Query,
  Body,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';

import { ConversationService } from '../conversation/conversation.service';
import { GetMessagesDto } from './dto/get-messages.dto';
import { MarkReadDto } from './dto/mark-read.dto';

import { ApiResponse } from 'src/utils/helper/ApiResponse';
import { Msg } from 'src/utils/helper/responseMsg';

import type { Request } from 'express';

import { JwtAuthGuard } from 'src/modules/auth/jwt/jwt-auth.guard';

@Controller('chat-message')
@UseGuards(JwtAuthGuard)
export class ChatMessageController {
  constructor(
    private readonly chatMessageService: ChatMessageService,
    private readonly conversationService: ConversationService,
  ) {}

  @Get('/message/:conversationId')
  async getMessages(
    @Param('conversationId') conversationId: string,
    @Query() query: GetMessagesDto,
    @Req() req: Request,
  ) {
    const isAllowed = await this.conversationService.isParticipant(
      conversationId,
      req.user.id,
    );

    if (!isAllowed) {
      return new ApiResponse(403, {}, Msg.FORBIDDEN);
    }

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;

    return this.chatMessageService.getMessages(conversationId, page, limit);
  }

  @Patch('read')
  async markAsRead(
    @Body() body: MarkReadDto,
    @Req() req: Request,
  ) {
    return this.chatMessageService.markAsRead(
      body.messageIds,
      req.user.id,
    );
  }
}
