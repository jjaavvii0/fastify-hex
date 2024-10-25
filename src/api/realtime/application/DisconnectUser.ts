export const disconnectUserUseCase = (socketRepository:any, socket: any): void => {
    socketRepository.disconnectUser(socket);
};
