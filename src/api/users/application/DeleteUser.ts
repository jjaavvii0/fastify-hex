import { z } from "zod";
import { IUserRepository } from "../domain/IUserRepository";

const deleteUserSchema = z.object({
    id: z.number().int().positive(),
});

export const deleteUserUseCase = async (
    userRepository: IUserRepository,
    id: number
):Promise<string> => {
    const {id : validatedId} = deleteUserSchema.parse({ id });
    return await userRepository.delete(validatedId)
};
