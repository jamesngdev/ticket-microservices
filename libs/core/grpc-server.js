const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const createGrpcServer = (config, serviceMethods) => {
    // Load the protobuf file
    const packageDefinition = protoLoader.loadSync(config.protoPath, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

    // Load the service definition from the protobuf file
    const grpcProto = grpc.loadPackageDefinition(packageDefinition)[config.package];

    // Create the gRPC server
    const server = new grpc.Server();

    // Add service methods to the server
    server.addService(grpcProto[config.service].service, serviceMethods);

    // Bind the server to the specified port and host
    server.bindAsync(`${config.host}:${config.port}`, grpc.ServerCredentials.createInsecure(), (error, bindPort) => {
        if (error) {
            console.error(`Error binding server: ${error}`);
            return;
        }
        console.log(`Server running at ${config.host}:${config.port}`);
        server.start();
    });

    return server;
};

module.exports = {
    createGrpcServer
};
