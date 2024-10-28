import { Server, Socket } from "socket.io";
import { disconnectUserUseCase } from "../application/DisconnectUser";
import { handleMessageUseCase } from "../application/HandleMessage";
import { socketRepository } from "./SocketRepository";
import { socketAuthMiddleware } from "./SocketAuthMiddleware";

export const initializeSocket = (io: Server) => {
    io.use(socketAuthMiddleware);

    io.on("connection", (socket: Socket) => {
        const userEmail = socket.data.user.email;
        console.log("User connected:", userEmail);
        socket.data.userEmail = userEmail;

        socket.on("message", (message: string) => {
            handleMessageUseCase(socketRepository, socket, io, message);
        });

        socket.on("disconnect", () => {
            disconnectUserUseCase(socketRepository, socket);
        });
    });
    return {
        sendNotificationToAll: (message: string) =>
            socketRepository.sendNotificationToAll(io, message),
    };
};
