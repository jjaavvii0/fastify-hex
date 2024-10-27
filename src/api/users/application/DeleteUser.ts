import { IUserRepository } from "../domain/IUserRepository";

export const deleteUserUseCase = async (
    userRepository: IUserRepository,
    id: number
):Promise<string> => {
    return await userRepository.delete(id)
};
