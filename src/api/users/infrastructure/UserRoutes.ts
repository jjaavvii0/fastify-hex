import { FastifyInstance } from "fastify";
import { userRepository } from "./UserRepository";
import { createUserUseCase } from "../application/CreateUser";
import { getUsersUseCase } from "../application/GetUsers";
import { deleteUserUseCase } from "../application/DeleteUser";
import { updateUserUseCase } from "../application/UpdateUser";

export async function userRoutes(server: FastifyInstance) {
    //TODO = ERROR HANDLING
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
    //TODO = ERROR HANDLING
    server.get("/users", async (_, reply) => {
        const users = await getUsersUseCase(userRepository);
        reply.status(200).send(users);
    });
    //TODO = ERROR HANDLING
    server.patch("/users", async (request, reply) => {
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

        const updatedUser = await updateUserUseCase(userRepository, {
            email,
            password,
            name: name ?? undefined,
            profilePicture: profilePicture ?? undefined,
            roles: rolesWithoutAdmin,
        });
        reply.status(200).send(updatedUser);
    });

    server.delete("/users", async (request, reply) => {
        try {
            const { id } = request.body as { id: number };
            const deletedUser = await deleteUserUseCase(userRepository, id);
            if (deletedUser) {
                reply.status(204).send();
            } else {
                reply.status(404).send({ error: "User not found" });
            }
        } catch (error) {
            reply
                .status(500)
                .send({ error: "An error occurred while deleting the user" });
        }
    });
}
