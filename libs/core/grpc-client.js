const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const config = require('./config');
const services = config.services;

let clients = {};

const initGrpcClients = () => {
    for (const serviceName in services) {
        if (!services.hasOwnProperty(serviceName)) continue;

        const service = services[serviceName];
        const packageDefinition = protoLoader.loadSync(service.protoPath, {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
        const proto = grpc.loadPackageDefinition(packageDefinition)[service.package];
        clients[serviceName] = new proto[service.service](service.host + ':' + service.port, grpc.credentials.createInsecure());
    }
}

const getGrpcClient = (serviceName) => {
    return clients[serviceName];
}

module.exports = {
    initGrpcClients,
    getGrpcClient
};