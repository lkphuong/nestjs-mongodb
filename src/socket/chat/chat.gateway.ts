import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import * as jwt from 'jsonwebtoken';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(
    client: Socket,
    payload: { name: string; room: string; message: string; token: string },
  ): void {
    //let auth_token = socket.handshake.headers.authorization;
    // auth_token = auth_token.split(' ')[1];
    jwt.verify(payload.token, process.env.JWT_SECRET, (error, result) => {
      if (error) {
        console.log('jwt socket');
        client.disconnect(true);
      } else {
        client.join(payload.room);
        this.server.to(payload.room).emit('msgToClient', payload);
      }
    });
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  @SubscribeMessage('joinRoom')
  handleRoomJoin(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
