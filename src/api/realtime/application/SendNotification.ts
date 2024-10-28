import { ISocketRepository } from "../domain/ISocketRepository";
import { Server } from "socket.io";

export const sendNotificationUseCase = (
    socketRepository: ISocketRepository,
    io: Server,
    message: string
): void => {
    socketRepository.sendNotificationToAll(io, message);
};
