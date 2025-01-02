const {createProducer} = require("../../../../libs/core/kafka-client");

const CLIENT_ID = 'event-service';

async function sendMessage(topic, message) {
    const producer = createProducer(CLIENT_ID);
    await producer.connect();

    console.log(`Sending message to topic: ${topic}`);

    await producer.send({
        topic: topic,
        messages: [
            {value: JSON.stringify(message)}, // Serialize message thành chuỗi JSON
        ],
    });

    // console.log(`Message sent successfully:`, message);

    await producer.disconnect();
}

module.exports = {
    sendMessage
}