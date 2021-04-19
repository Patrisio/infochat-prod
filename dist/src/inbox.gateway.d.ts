import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
export declare class InboxGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private logger;
    reduceUnreadCountAnybody(client: Socket, payload: any): void;
    reduceOpenedToAnybody(client: Socket, payload: any): void;
    updateAssignedToAnybody(client: Socket, payload: any): void;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
}
