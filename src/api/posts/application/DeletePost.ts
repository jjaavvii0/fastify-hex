import { IPostRepository } from "../domain/IPostRepository";

export const deletePostUseCase = async (
    postRepository: IPostRepository,
    postId: number
) => {
    return await postRepository.delete(postId);
};
