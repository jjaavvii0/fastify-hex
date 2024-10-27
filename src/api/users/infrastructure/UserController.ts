import { FastifyReply, FastifyRequest } from "fastify";
import { userRepository } from "./UserRepository";
import { createUserUseCase } from "../application/CreateUser";
import { getUsersUseCase } from "../application/GetUsers";
import { deleteUserUseCase } from "../application/DeleteUser";
import { updateUserUseCase } from "../application/UpdateUser";

export const userController = {
    async createUser(request: FastifyRequest, reply: FastifyReply) {
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

        try {
            const user = await createUserUseCase(userRepository, {
                email,
                password,
                name: name ?? undefined,
                profilePicture: profilePicture ?? undefined,
                roles: rolesWithoutAdmin,
            });
            reply.status(201).send(user);
        } catch (error: any) {
            reply.status(500).send({ error: error.message });
        }
    },

    async getUsers(_: FastifyRequest, reply: FastifyReply) {
        try {
            const users = await getUsersUseCase(userRepository);
            reply.status(200).send(users);
        } catch (error: any) {
            reply.status(500).send({ error: error.message });
        }
    },

    async updateUser(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: number };
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

        try {
            const updatedUser = await updateUserUseCase(userRepository, {
                id: Number(id),
                email,
                password,
                name: name ?? undefined,
                profilePicture: profilePicture ?? undefined,
                roles: rolesWithoutAdmin,
            });
            reply.status(200).send(updatedUser);
        } catch (error: any) {
            reply.status(500).send({ error: error.message });
        }
    },

    async deleteUser(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: number };
        try {
            await deleteUserUseCase(userRepository, Number(id));
            reply.status(204).send();
        } catch (error: any) {
            if (error.code === "P2025") {
                reply.status(404).send({ error: "User not found" });
            } else {
                reply.status(500).send({ error: error.message });
            }
        }
    },
};
