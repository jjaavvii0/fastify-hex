import { FastifyInstance } from "fastify";
import { postsController } from "./PostController";

export async function postRoutes(server: FastifyInstance) {
    server.post("/", postsController.createPost);
    server.get("/", postsController.getPosts);
    server.patch("/:id", postsController.updatePost);
    server.delete("/:id", postsController.deletePost);
    server.get("/user/:authorId", postsController.getPostsByUser);
}
