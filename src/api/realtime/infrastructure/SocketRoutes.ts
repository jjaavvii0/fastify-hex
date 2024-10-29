import { FastifyInstance } from "fastify";
import { socketRepository } from "./SocketRepository";

export async function socketRoutes(
    server: FastifyInstance,
    options: { sendNotificationToAll: (message: string) => void }
) {
    const { sendNotificationToAll } = options;

    server.post("/notification", async (request, reply) => {
        try {
            const { message } = request.body as { message: string };
            if (!message || message.trim() === "") {
                return reply
                    .status(500)
                    .send({ error: "Message content cannot be empty" });
            }
            sendNotificationToAll(message);
            return reply
                .status(200)
                .send({ status: "Notification sent to all users" });
        } catch (error: any) {
            reply.status(500).send({ error: error.message });
        }
    });
}
