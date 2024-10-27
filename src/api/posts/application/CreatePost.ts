import { IPostRepository } from "../domain/IPostRepository";
import { Post } from "../domain/Post";

export const createPostUseCase = async (
    postRepository: IPostRepository,
    postData: Omit<Post, "id">
) => {
    return await postRepository.create(postData);
};
