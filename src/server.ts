//THIRD PARTY PACKAGES
import Fastify from "fastify";
import { Server as SocketIOServer } from "socket.io";
import dotenv from "dotenv";
import fastifyCookie from "@fastify/cookie";
import multipart from "@fastify/multipart";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import path from "path";
//ROUTES
import { userRoutes } from "./api/users/infrastructure/UserRoutes";
import { authRoutes } from "./api/auth/infrastructure/AuthRoutes";
import { postRoutes } from "./api/posts/infrastructure/PostRoutes";
//REST
import { initializeSocket } from "./api/realtime/infrastructure/InitializeSocket";
import { fastifyConfig, socketConfig } from "./config/serversOptions";
import { socketRoutes } from "./api/realtime/infrastructure/SocketRoutes";

dotenv.config();
const server = Fastify(fastifyConfig);
const io = new SocketIOServer(server.server, socketConfig);
const { sendNotificationToAll } = initializeSocket(io);

server.register(cors, {
    origin: process.env.CLIENT_ORIGIN || "https://example.com",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type", "x-requested-with"],
});
server.register(fastifyStatic, {
    root: path.join(__dirname, "../uploads"),
    prefix: "/uploads/",
});

server.register(fastifyCookie);
server.register(multipart);

server.register(userRoutes, { prefix: "/api/users" });
server.register(authRoutes, { prefix: "/api/auth" });
server.register(postRoutes, { prefix: "/api/posts" });
server.register(socketRoutes, { prefix: "/api/socket", sendNotificationToAll });

server.setErrorHandler((error, request, reply) => {
    console.error("Unhandled error:", error);
    reply
        .status(500)
        .send({ error: "Internal Server Error", message: error.message });
});

const start = async () => {
    try {
        await server.listen({ port: 3000, host: "0.0.0.0" });
        console.log("Server running at http://localhost:3000/");
    } catch (err) {
        server.log.error(err);
        if (process.env.NODE_ENV !== "test") {
            process.exit(1);
        }
    }
};
if (process.env.NODE_ENV !== "test") {
    start();
}
export { server, start };
