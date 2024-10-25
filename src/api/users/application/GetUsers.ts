import { IUserRepository } from "../domain/IUserRepository";
import { User } from "../domain/User";

export const getUsersUseCase = async (
    userRepository: IUserRepository
): Promise<User[]> => {
    return await userRepository.findAll();
};
