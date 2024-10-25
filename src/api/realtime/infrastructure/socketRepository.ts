import { ISocketRepository } from "../domain/ISocketRepository";

export const socketRepository: ISocketRepository = {

    disconnectUser(socket: any): void {
        console.log('User disconnected:', socket.id);
    },

    handleMessage(socket: any, io: any, message: string): void {
        io.emit('response', `${socket.id} says: ${message}`);
    }
};
