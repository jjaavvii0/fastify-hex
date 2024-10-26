import { IUserRepository } from "../domain/IUserRepository";
import { CreateUserParams, PublicUser, User } from "../domain/User";

export const createUserUseCase = async (
    userRepository: IUserRepository,
    userData: CreateUserParams
): Promise<PublicUser> => {
    return await userRepository.create(userData);
};
