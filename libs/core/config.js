const {join} = require("node:path");
const PROTO_DIR = join(__dirname, '../../proto');

module.exports = {
    protoDir: join(__dirname, '../../proto'),
    services: {
        event: {
            package: 'event',
            service: 'EventService',
            protoPath: join(PROTO_DIR, 'event.proto'),
            host: 'localhost',
            port: 50051,
            database: {
                connectionUri: 'mongodb://localhost:27017/events_db',
            }
        },
        user: {
            package: 'user',
            service: 'UserService',
            protoPath: join(PROTO_DIR, 'user.proto'),
            host: 'localhost',
            port: 50052,
            config: {
                jwtSecret: 'jwt-secret',
            },
            database: {
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'postgres',
                database: 'user_service_db',
            }
        },
        ticket: {
            package: 'ticket',
            service: 'TicketService',
            protoPath: join(PROTO_DIR, 'ticket.proto'),
            host: 'localhost',
            port: 50053,
            config: {
                jwtSecret: 'jwt-secret',
                redis: {
                    host: 'localhost',
                    port: 6379,
                },
                database: {
                    type: 'postgres',
                    host: 'localhost',
                    port: 5432,
                    username: 'postgres',
                    password: 'postgres',
                    database: 'ticket_service_db',
                }
            },
        }
    }
}