import { z } from "zod";
import { IPostRepository } from "../domain/IPostRepository";
import { Post } from "../domain/Post";

const updatePostSchema = z.object({
    id: z.number().int().positive().optional(),
    title: z.string().optional(),
    content: z.string().optional(),
    authorId: z.number().int().positive().optional(),
});

export const updatePostUseCase = async (
    postRepository: IPostRepository,
    postData: Partial<Post>
) => {
    const validatedData = updatePostSchema.parse(postData);
    return await postRepository.update(validatedData);
};
