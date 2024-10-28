import { ISocketRepository } from "../domain/ISocketRepository";
import { Server, Socket } from "socket.io";

export const handleMessageUseCase = (
    socketRepository: ISocketRepository,
    socket: Socket,
    io: Server,
    message: string
): void => {
    if (!message || typeof message !== "string") {
        console.log(`Invalid message from: ${socket.id}`);
        return;
    }

    socketRepository.handleMessage(socket, io, message);
};
