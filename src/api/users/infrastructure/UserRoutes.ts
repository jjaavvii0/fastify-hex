import { FastifyInstance } from "fastify";
import { userRepository } from "./PrismaUserRepository";
import { createUserUseCase } from "../application/CreateUser";
import { getUsersUseCase } from "../application/GetUsers";
import { logUserUseCase } from "../../auth/application/LogUser";
import { User } from "../domain/User";
// import { updateUserUseCase } from '../application/UpdateUser';
// import { deleteUserUseCase } from '../application/DeleteUser';

export async function userRoutes(server: FastifyInstance) {
    server.post("/users", async (request, reply) => {
        const { email, name, password } = request.body as {
            email: string;
            password: string;
            name?: string;
        };
        const user = await createUserUseCase(userRepository, email, password, name);
        reply.status(201).send(user);
    });

    server.get("/users", async (_, reply) => {
        const users = await getUsersUseCase(userRepository);
        reply.send(users);
    });
}
