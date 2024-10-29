import { z } from "zod";
import { IUserRepository } from "../domain/IUserRepository";
import { PublicUser, User } from "../domain/User";

const updateUserSchema = z.object({
    id: z.number().int().positive(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    name: z.string().optional(),
    profilePicture: z.string().optional(),
    roles: z.array(z.string()).optional(),
});

export const updateUserUseCase = async (
    userRepository: IUserRepository,
    userData: Partial<User>
): Promise<PublicUser|null> => {
    const validatedData = updateUserSchema.parse(userData);
    return await userRepository.update(validatedData);
};
