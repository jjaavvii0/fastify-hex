import { IUserRepository } from "../domain/IUserRepository";
import { PublicUser, User } from "../domain/User";

export const updateUserUseCase = async (
    userRepository: IUserRepository,
    userData: Partial<User>
): Promise<PublicUser|null> => {
    return await userRepository.update(userData);
};
