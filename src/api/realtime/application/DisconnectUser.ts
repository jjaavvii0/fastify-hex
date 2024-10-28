import { ISocketRepository } from "../domain/ISocketRepository";
import { Socket } from "socket.io";

export const disconnectUserUseCase = (
    socketRepository: ISocketRepository,
    socket: Socket
): void => {
    socketRepository.disconnectUser(socket);
};
