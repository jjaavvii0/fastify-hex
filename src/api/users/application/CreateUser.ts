import { z } from "zod";
import { IUserRepository } from "../domain/IUserRepository";
import { CreateUserParams, PublicUser, User } from "../domain/User";


const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
    profilePicture: z.string().optional(),
    roles: z.array(z.string()).optional().default([]),
});


export const createUserUseCase = async (
    userRepository: IUserRepository,
    userData: CreateUserParams
): Promise<PublicUser> => {
    const validatedData = createUserSchema.parse(userData);
    return await userRepository.create(validatedData);
};
