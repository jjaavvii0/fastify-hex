import { IUserRepository } from "../domain/IUserRepository";
import { PublicUser, User } from "../domain/User";

export const getUsersUseCase = async (
    userRepository: IUserRepository
): Promise<PublicUser[]> => {
    return await userRepository.findAll();
};
