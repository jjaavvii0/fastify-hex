export const fastifyConfig = {
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
}

export const socketConfig = {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
}
