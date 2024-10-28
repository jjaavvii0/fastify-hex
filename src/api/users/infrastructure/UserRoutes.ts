import { FastifyInstance } from "fastify";
import { userController } from "./UserController";
import { authMiddleware } from "../../auth/infrastructure/AuthMiddleware";
import { ownerOrAdminMiddleware } from "../../auth/infrastructure/OwnerOrAdminMiddleware";

export async function userRoutes(server: FastifyInstance) {
    server.post("/", userController.createUser);
    server.get("/", { preHandler: [authMiddleware] }, userController.getUsers);
    server.patch(
        "/:id",
        { preHandler: [authMiddleware, ownerOrAdminMiddleware("id", "user")] },
        userController.updateUser
    );
    server.delete(
        "/:id",
        { preHandler: [authMiddleware, ownerOrAdminMiddleware("id", "user")] },
        userController.deleteUser
    );
    // server.get("/users/:id", userController.getUserById); //TODO
    server.post(
        "/:id/uploadProfileImg",
        { preHandler: [authMiddleware] },
        userController.uploadProfileImg
    );
}
