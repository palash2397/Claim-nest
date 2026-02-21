import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChatMessageService } from './chat-message/chat-message.service';
import { Injectable } from '@nestjs/common';

@WebSocketGateway({
  cors: { origin: '*' },
})

@Injectable()
export class ChatGateway {
  constructor(private messageService: ChatMessageService) {}

  // Join Room
  @SubscribeMessage('joinConversation')
  handleJoin(
    @MessageBody() conversationId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(conversationId);
  }

  // Send Message
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    data: {
      conversationId: string;
      senderId: string;
      content: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    // Save message
    const message = await this.messageService.create(data);

    // Broadcast to room
    client.to(data.conversationId).emit('receiveMessage', message);

    // Also return to sender
    return message;
  }
}
