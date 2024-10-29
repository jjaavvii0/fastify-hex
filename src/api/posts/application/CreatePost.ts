import { z } from "zod";
import { IPostRepository } from "../domain/IPostRepository";
import { Post } from "../domain/Post";

const createPostSchema = z.object({
    title: z.string().min(1),
    content: z.string().optional(),
    authorId: z.number().int().positive(),
});

export const createPostUseCase = async (
    postRepository: IPostRepository,
    postData: Omit<Post, "id">
) => {
    const validatedData = createPostSchema.parse(postData);
    return await postRepository.create(validatedData);
};
