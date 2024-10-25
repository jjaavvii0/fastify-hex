import { IUserRepository } from "../domain/IUserRepository";
import { User } from "../domain/User";

export const createUserUseCase = async (
    userRepository: IUserRepository,
    email: string,
    name?: string
): Promise<User> => {
    const user: Omit<User, "id"> = { email, name };
    return await userRepository.create(user);
};
