//PACKAGES
import Fastify from "fastify";
import { Server as SocketIOServer } from "socket.io";
import dotenv from "dotenv";
//ROUTES
import { userRoutes } from "./api/users/infrastructure/UserRoutes";
import { authRoutes } from "./api/auth/infrastructure/AuthRoutes";
//OTHERS
import { createSocketIO } from "./api/realtime/infrastructure/createSocketIO";
//CONFIG
import { fastifyConfig, socketConfig } from "./config/serversOptions";
dotenv.config();

const server = Fastify(fastifyConfig);
const io = new SocketIOServer(server.server, socketConfig);

createSocketIO(io);

server.register(userRoutes, { prefix: "/api" });
server.register(authRoutes, { prefix: "/api" });
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
