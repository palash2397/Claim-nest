import {
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatMessageService } from './chat-message/chat-message.service';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private onlineUsers = new Map<string, string>();

  constructor(
    private jwtService: JwtService,
    private chatMessageService: ChatMessageService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth?.token;

      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token);

      // ✅ Add user to online list
      this.onlineUsers.set(payload.id, client.id);

      // ✅ Broadcast updated online users
      this.server.emit('onlineUsers', Array.from(this.onlineUsers.keys()));

      client.data.user = payload;
    } catch (error) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const user = client.data.user;

    if (user?.id) {
      this.onlineUsers.delete(user.id);

      // Broadcast updated online users
      this.server.emit('onlineUsers', Array.from(this.onlineUsers.keys()));
    }
  }

  @SubscribeMessage('joinConversation')
  async handleJoin(
    @MessageBody() conversationId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(conversationId);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    data: {
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
      client.to(data.conversationId).emit('receiveMessage', response.data);
    }

    return response;
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const user = client.data.user;

    // Notify others in room (except sender)
    client.to(data.conversationId).emit('userTyping', {
      userId: user.id,
      conversationId: data.conversationId,
    });
  }
}
