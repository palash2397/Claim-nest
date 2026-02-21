import {
  WebSocketGateway,
  OnGatewayConnection,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';

import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatMessageService } from './chat-message/chat-message.service';
import { Injectable } from '@nestjs/common';

@WebSocketGateway({
  cors: { origin: '*' },
})

@Injectable()
export class ChatGateway implements OnGatewayConnection {

  constructor(
    private jwtService: JwtService,
    private messageService: ChatMessageService,
  ) {}

  // 🔐 When user connects
  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;

      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token);

      // attach user to socket
      client.data.user = payload;

    } catch (err) {
      client.disconnect();
    }
  }

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
    @MessageBody() data: {
      conversationId: string;
      content: string;
    },
    @ConnectedSocket() client: Socket,
  ) {

    const user = client.data.user;

    const message = await this.messageService.create({
      conversationId: data.conversationId,
      senderId: user.id, // 🔐 from JWT
      content: data.content,
    });

    client.to(data.conversationId).emit('receiveMessage', message);

    return message;
  }
}