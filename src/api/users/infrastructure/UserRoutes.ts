import { FastifyInstance } from "fastify";
import { userRepository } from "./PrismaUserRepository";
import { createUserUseCase } from "../application/CreateUser";
import { getUsersUseCase } from "../application/GetUsers";
// import { updateUserUseCase } from '../application/UpdateUser';
// import { deleteUserUseCase } from '../application/DeleteUser';

export async function userRoutes(server: FastifyInstance) {
    server.post("/users", async (request, reply) => {
        const { email, name } = request.body as {
            email: string;
            name?: string;
        };
        const user = await createUserUseCase(userRepository, email, name);
        reply.status(201).send(user);
    });

    server.get("/users", async (request, reply) => {
        const users = await getUsersUseCase(userRepository);
        reply.send(users);
    });
}
