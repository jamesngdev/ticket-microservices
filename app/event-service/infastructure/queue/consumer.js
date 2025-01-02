const {createConsumer} = require("../../../../libs/core/kafka-client");
const {orderCreatedUseCase} = require("../../applications/use-cases/order-created.use-case");
const {sendMessage} = require("./producer");

const consumer = createConsumer('event-service', {
    groupId: 'event-service-group'
});

async function listenOrderCreated() {
    const topic = 'order-events';

    await consumer.connect();
    await consumer.subscribe({topic, fromBeginning: false});

    console.info(`Listening for events on topic: ${topic}`);

    await consumer.run({
        eachMessage: async ({message}) => {
            try {
                const event = JSON.parse(message.value.toString());
                console.info(`Received message: ${JSON.stringify(event)}`);

                if (event.type === 'OrderCreated') {
                    await handleOrderCreated(event);
                } else {
                    console.warn(`Unhandled event type: ${event.type}`);
                }
            } catch (error) {
                console.error(`Error processing message: ${error.message}`);
            }
        },
    });
}

async function handleOrderCreated(event) {
    const order = event?.data?.order;

    const result = await orderCreatedUseCase(order);
    const messageType = result.error ? 'TicketReservationFailed' : 'TicketReserved';

    const messageData = result.error
        ? {orderId: order.id, reason: result.message}
        : {orderId: order.id};

    await sendMessage('ticket-reservation-events', {
        type: messageType,
        data: messageData,
    });

    console.info(`${messageType} event sent for orderId: ${order.id}`);
}

module.exports = {
    listenOrderCreated,
};