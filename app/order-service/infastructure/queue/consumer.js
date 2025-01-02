const {createConsumer} = require("../../../../libs/core/kafka-client");
const {sendMessage} = require("./producer");
const {
    ticketReservedUseCase, ticketReservationFailedUseCase
} = require("../../applications/use-cases/ticket-reserved.use-case");

const consumer = createConsumer('order-service', {
    groupId: 'order-service-group'
});

async function listenTicketReserved() {
    const topic = 'ticket-reservation-events';

    await consumer.connect();
    await consumer.subscribe({topic, fromBeginning: false});

    console.info(`Listening for events on topic: ${topic}`);

    await consumer.run({
        eachMessage: async ({message}) => {
            try {
                const event = JSON.parse(message.value.toString());
                console.info(`Received message: ${JSON.stringify(event)}`);


                switch (event.type) {
                    case 'TicketReserved':
                        await handleTicketReserved(event);
                        break;
                    case 'TicketReservationFailed':
                        await handleTicketReservationFailed(event);
                        break;
                    default:
                        console.warn(`Unhandled event type: ${event.type}`);
                }
            } catch (error) {
                console.error(`Error processing message: ${error.message}`);
            }
        },
    });
}

async function handleTicketReserved(event) {
    const orderId = event?.data?.orderId;

    console.info(`Ticket reserved for orderId: ${orderId}`);
    // Update event status to 'Reserved'
    await ticketReservedUseCase(orderId);
    console.log(`Ticket reserved for orderId: ${orderId}`);
}

async function handleTicketReservationFailed(event) {
    const eventId = event?.data?.eventId;
    const reason = event?.data?.reason;

    console.info(`Ticket reservation failed for eventId: ${eventId}. Reason: ${reason}`);
    // Update event status to 'Available'
    await ticketReservationFailedUseCase(event);
    console.log(`Ticket reservation failed for eventId: ${eventId}`);
}

module.exports = {
    listenTicketReserved,
};