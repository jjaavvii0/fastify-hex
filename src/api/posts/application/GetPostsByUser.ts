import { z } from "zod";
import { IPostRepository } from "../domain/IPostRepository";

const getPostsByUserSchema = z.object({
    userId: z.number().int().positive(),
});

export const getPostsByUserUseCase = async (
    postRepository: IPostRepository,
    userId: number
) => {
    const { userId: validatedUserId } = getPostsByUserSchema.parse({ userId: Number(userId) });
    return await postRepository.findByUser(validatedUserId);
};
