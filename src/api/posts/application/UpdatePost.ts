import { IPostRepository } from "../domain/IPostRepository";
import { Post } from "../domain/Post";

export const updatePostUseCase = async (
    postRepository: IPostRepository,
    postData: Partial<Post>
) => {
    return await postRepository.update(postData);
};
