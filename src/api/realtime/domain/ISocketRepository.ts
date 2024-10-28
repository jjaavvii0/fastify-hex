import { Server, Socket } from "socket.io";

export interface ISocketRepository {
    disconnectUser(socket: Socket): void;
    handleMessage(socket: Socket, io: Server, message: string): void;
    sendNotificationToAll(io: Server, message: string): void;
}
