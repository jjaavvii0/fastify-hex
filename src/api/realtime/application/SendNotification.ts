import { z } from "zod";
import { ISocketRepository } from "../domain/ISocketRepository";
import { Server } from "socket.io";

const messageSchema = z.string().min(1);

export const sendNotificationUseCase = (
    socketRepository: ISocketRepository,
    io: Server,
    message: string
): void => {
    const validatedMessage = messageSchema.parse(message);
    socketRepository.sendNotificationToAll(io, validatedMessage);
};
