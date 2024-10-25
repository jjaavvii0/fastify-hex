import Fastify from "fastify";
import { Server as SocketIOServer } from "socket.io";
import dotenv from "dotenv";
import { userRoutes } from "./users/infrastructure/UserRoutes";

dotenv.config();

const server = Fastify({
    logger: {
        transport: {
            target: "pino-pretty",
            options: {
                translateTime: "HH:MM:ss",
                ignore: "pid,hostname,reqId,responseTime",
                colorize: true,
            },
        },
    },
});

const io = new SocketIOServer(server.server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

server.register(userRoutes, { prefix: "/api" });

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
