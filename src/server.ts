//PACKAGES
import Fastify from "fastify";
import { Server as SocketIOServer } from "socket.io";
import dotenv from "dotenv";
import fastifyCookie from "@fastify/cookie";
import multipart from "@fastify/multipart";
import cors from "@fastify/cors";

//ROUTES
import { userRoutes } from "./api/users/infrastructure/UserRoutes";
import { authRoutes } from "./api/auth/infrastructure/AuthRoutes";
import { postRoutes } from "./api/posts/infrastructure/PostRoutes";
//OTHERS
import { initializeSocket } from "./api/realtime/infrastructure/InitializeSocket";
//CONFIG
import { fastifyConfig, socketConfig } from "./config/serversOptions";
import fastifyStatic from "@fastify/static";
import path from "path";
import { socketRoutes } from "./api/realtime/infrastructure/SocketRoutes";

dotenv.config();
const server = Fastify(fastifyConfig);
const io = new SocketIOServer(server.server, socketConfig);

server.register(cors, {
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type", "x-requested-with"],
});

server.register(fastifyCookie);
server.register(multipart);
server.register(fastifyStatic, {
    root: path.join(__dirname, "../uploads"),
    prefix: "/uploads/",
});

const { sendNotificationToAll } = initializeSocket(io);

server.register(userRoutes, { prefix: "/api/users" });
server.register(authRoutes, { prefix: "/api/auth" });
server.register(postRoutes, { prefix: "/api/posts" });
server.register(socketRoutes, { prefix: "/api/socket", sendNotificationToAll });
server.get("/", async (request, reply) => {
    return { status: "working" };
});

const start = async () => {
    try {
        await server.listen({ port: 3000, host: "0.0.0.0" });
        console.log("Server running at http://localhost:3000/");
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
