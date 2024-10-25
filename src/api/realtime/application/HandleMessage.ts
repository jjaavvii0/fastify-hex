export const handleMessageUseCase = (socketRepository:any, socket: any, io: any, message: any): void => {
    if (!message || typeof message !== 'string') {
        console.log(`Invalid message from: ${socket.id}`);
        return;
    }

    socketRepository.handleMessage(socket, io, message);
};
