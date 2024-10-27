import { FastifyInstance } from "fastify";
import { userController } from "./UserController";

export async function userRoutes(server: FastifyInstance) {
    server.post("/", userController.createUser);
    server.get("/", userController.getUsers);
    server.patch("/:id", userController.updateUser);
    server.delete("/:id", userController.deleteUser);
    // server.get("/users/:id", userController.getUserById); //TODO
}
