import { IPostRepository } from "../domain/IPostRepository";
import { Post } from "../domain/Post";

export const getPostsUseCase = async (
    postRepository: IPostRepository
): Promise<Post[]> => {
    return await postRepository.findAll();
};
