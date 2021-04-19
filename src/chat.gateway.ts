import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket
  } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

interface IMessage {
  clientId: string,
  username: string,
  msg: string
}

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('ChatGateway');

  @SubscribeMessage('chatMessage')
  handleMessage(client: Socket, payload: any): void {
    this.server.to(payload.projectId).emit('addIncomingMessage', payload);
    this.server.to(payload.projectId).emit('updateUnreadDialog', payload);
  }

  @SubscribeMessage('operatorMessageFromInfochat')
  handleOperatorMessageFromInfochat(client: Socket, payload: {room: string, message: string}): void {
    this.server.to(payload.room).emit('addMessageToClientChat', payload.message);
  }

  @SubscribeMessage('joinRoom')
  handleRoomJoin(client: Socket, room: string ) {
    client.join(room);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}