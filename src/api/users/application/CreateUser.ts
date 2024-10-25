import { IUserRepository } from "../domain/IUserRepository";
import { PublicUser, User } from "../domain/User";

export const createUserUseCase = async (
    userRepository: IUserRepository,
    email: string,
    password: string,
    name?: string,
    profilePicture?: string
): Promise<PublicUser> => {
    const user: Omit<User, "id"> = { email, name, password, profilePicture };
    return await userRepository.create(user);
};
