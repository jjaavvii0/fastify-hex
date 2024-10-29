import { z } from "zod";
import { IPostRepository } from "../domain/IPostRepository";

const deletePostSchema = z.object({
    postId: z.number().int().positive(),
});

export const deletePostUseCase = async (
    postRepository: IPostRepository,
    postId: number
) => {
    const { postId: validatedPostId } = deletePostSchema.parse({ postId });
    return await postRepository.delete(validatedPostId);
};
