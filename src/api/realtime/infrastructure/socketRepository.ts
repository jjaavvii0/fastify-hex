import { Socket, Server } from "socket.io";
import { ISocketRepository } from "../domain/ISocketRepository";

export const socketRepository: ISocketRepository = {
    disconnectUser(socket: Socket): void {
        console.log("User disconnected:", socket.data.user.email);
    },

    handleMessage(socket: Socket, io: Server, message: string): void {
        console.log(`${socket.data.user.email} says: ${message}`);
        io.emit("response", `${socket.data.user.email} says: ${message}`);
    },

    sendNotificationToAll(io: Server, message: string): void {
        io.emit("notification", message);
        console.log("Notification sent to all users:", message);
    },
};
