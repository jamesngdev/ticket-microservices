const {Kafka} = require('kafkajs');
const configs = require('./config');
let kafka = {};

const createKafkaClient = (clientId) => {
    if (kafka[clientId]) {
        return kafka[clientId];
    }

    kafka[clientId] = new Kafka({
        clientId: clientId, brokers: configs.kafka.brokers,
    });
    return kafka[clientId];
};


const createProducer = (clientId) => {
    const kafka = createKafkaClient(clientId);
    return kafka.producer();
};


const createConsumer = (clientId, consumerOptions) => {
    const kafka = createKafkaClient(clientId);
    return kafka.consumer({
       ...consumerOptions,
        fetchMinBytes: 1, // Nhận message ngay khi có dữ liệu
    });
}

module.exports = {
    createKafkaClient,
    createProducer,
    createConsumer
};