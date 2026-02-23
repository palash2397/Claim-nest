import {
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
} from '@nestjs/websockets';

import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatMessageService } from './chat-message/chat-message.service';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection {

  constructor(
    private jwtService: JwtService,
    private chatMessageService: ChatMessageService,
  ) {}

  // 🔐 1️⃣ Authenticate on connection
  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth?.token;

      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token);

      client.data.user = payload;

    } catch (error) {
      client.disconnect();
    }
  }

  // 🏠 2️⃣ Join Conversation Room
  @SubscribeMessage('joinConversation')
  async handleJoin(
    @MessageBody() conversationId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(conversationId);
  }

  // 💬 3️⃣ Send Live Message
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: {
      conversationId: string;
      content: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    const user = client.data.user;

    // Save message using your existing API logic
    const response = await this.chatMessageService.create({
      conversationId: data.conversationId,
      senderId: user.id,
      content: data.content,
    });

    // If message saved successfully
    if (response.statusCode === 201) {
      // Emit to others in room
      client
        .to(data.conversationId)
        .emit('receiveMessage', response.data);
    }

    return response;
  }
}