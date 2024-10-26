import { FastifyInstance } from "fastify";
import { userRepository } from "./PrismaUserRepository";
import { createUserUseCase } from "../application/CreateUser";
import { getUsersUseCase } from "../application/GetUsers";

export async function userRoutes(server: FastifyInstance) {
    server.post("/users", async (request, reply) => {
        const {
            email,
            password,
            name,
            profilePicture,
            roles = ["user"],
        } = request.body as {
            email: string;
            password: string;
            name?: string | null;
            profilePicture?: string | null;
            roles?: string[];
        };

        const rolesWithoutAdmin = roles.includes("admin") ? ["user"] : roles;

        const user = await createUserUseCase(userRepository, {
            email,
            password,
            name: name ?? undefined,
            profilePicture: profilePicture ?? undefined,
            roles: rolesWithoutAdmin,
        });

        reply.status(201).send(user);
    });

    server.get("/users", async (_, reply) => {
        const users = await getUsersUseCase(userRepository);
        reply.status(200).send(users);
    });
}
