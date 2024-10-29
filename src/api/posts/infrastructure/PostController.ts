import { FastifyRequest, FastifyReply } from "fastify";
import { createPostUseCase } from "../application/CreatePost";
import { postRepository } from "./PostRepository";
import { getPostsByUserUseCase } from "../application/GetPostsByUser";
import { deletePostUseCase } from "../application/DeletePost";
import { updatePostUseCase } from "../application/UpdatePost";
import { getPostsUseCase } from "../application/GetPosts";

export const postsController = {
    async createPost(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { title, content, authorId } = request.body as {
                title: string;
                content?: string | null;
                authorId: number;
            };
            const newPost = await createPostUseCase(postRepository, {
                title,
                content,
                authorId,
            });
            reply.status(201).send(newPost);
        } catch (error: any) {
            reply.status(500).send({ error: error.message });
        }
    },
    async getPosts(_: FastifyRequest, reply: FastifyReply) {
        try {
            const posts = await getPostsUseCase(postRepository);
            reply.status(200).send(posts);
        } catch (error: any) {
            reply.status(500).send({ error: error.message });
        }
    },
    async getPostsByUser(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { authorId } = request.params as { authorId: number };
            const postsByUser = await getPostsByUserUseCase(
                postRepository,
                authorId
            );
            reply.status(200).send(postsByUser);
        } catch (error: any) {
            reply.status(500).send({ error: error.message });
        }
    },
    async updatePost(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = request.params as { id: number };
            const { title, content, authorId } = request.body as {
                title: string;
                content?: string;
                authorId: number;
            };
            const updatedPost = await updatePostUseCase(postRepository, {
                id: Number(id),
                title,
                content,
                authorId,
            });
            reply.status(200).send(updatedPost);
        } catch (error: any) {
            reply.status(500).send({ error: error.message });
        }
    },
    async deletePost(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = request.params as { id: number };
            await deletePostUseCase(postRepository, Number(id));
            reply.status(200).send();
        } catch (error: any) {
            if (error.code === "P2025") {
                reply.status(404).send({ error: "Post not found" });
            } else {
                reply.status(500).send({ error: error.message });
            }
        }
    },
};
