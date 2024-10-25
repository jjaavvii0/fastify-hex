import { disconnectUserUseCase } from "../application/DisconnectUser";
import { handleMessageUseCase } from "../application/HandleMessage";
import { socketRepository } from "./socketRepository";

export const createSocketIO = (io: any) => {
    io.on('connection', (socket: any) => {
        console.log('User connected:', socket.id);

        socket.on('message', (message: string) => {
            handleMessageUseCase(socketRepository, socket, io, message);
        });

        socket.on('disconnect', () => {
            disconnectUserUseCase(socketRepository, socket);
        });
    });
};
