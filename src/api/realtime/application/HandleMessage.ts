import { z } from "zod";
import { ISocketRepository } from "../domain/ISocketRepository";
import { Server, Socket } from "socket.io";

const messageSchema = z.string().min(1);

export const handleMessageUseCase = (
    socketRepository: ISocketRepository,
    socket: Socket,
    io: Server,
    message: string
): void => {
    const validatedMessage = messageSchema.parse(message);
    socketRepository.handleMessage(socket, io, validatedMessage);
};
