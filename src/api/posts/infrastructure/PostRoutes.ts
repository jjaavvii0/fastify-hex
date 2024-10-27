import { FastifyInstance } from "fastify";
import { postsController } from "./PostController";
import { authMiddleware } from "../../auth/infrastructure/AuthMiddleware";
import { ownerOrAdminMiddleware } from "../../auth/infrastructure/OwnerOrAdminMiddleware";

export async function postRoutes(server: FastifyInstance) {
    server.post(
        "/",
        { preHandler: [authMiddleware] },
        postsController.createPost
    );
    server.get("/", postsController.getPosts);
    server.patch(
        "/:id",
        { preHandler: [authMiddleware, ownerOrAdminMiddleware("id", "post")] },
        postsController.updatePost
    );
    server.delete(
        "/:id",
        { preHandler: [authMiddleware, ownerOrAdminMiddleware("id", "post")] },
        postsController.deletePost
    );
    server.get(
        "/user/:authorId",
        { preHandler: [authMiddleware] },
        postsController.getPostsByUser
    );
}
