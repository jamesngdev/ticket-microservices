const {createEventUseCase, listEventUseCase} = require("../../applications/use-cases");
const {getEventByIdUseCase} = require("../../applications/use-cases/get-event-by-id.use-case");

exports.createEvent = async (call, callback) => {
    const payload = call.request;
    const {error, message, data} = await createEventUseCase(payload);

    if (error) {
        return callback({
            code: error,
            details: message
        });
    }

    callback(null, {message: 'Event created successfully', eventId: data._id});

}

exports.getEventById = (call, callback) => {
    const eventId = call.request.eventId;

    getEventByIdUseCase(eventId).then(({error, message, data}) => {
        if (error) {
            return callback({
                code: error,
                details: message
            });
        }

        const event = {
            ...data.toObject(),
            tickets: data.tickets.map(ticket => ({
                ...ticket.toObject(),
                _id: ticket?._id?.toString(),
            })),
            eventId: data._id,
        };

        callback(null, event);
    });
}


exports.listEvents = async (call, callback) => {
    const {error, message, data} = await listEventUseCase();

    if (error) {
        return callback({
            code: error,
            details: message
        });
    }

    // Convert Mongoose object to plain object
    let events = data.map(event => ({
        ...event.toObject(),
        eventId: event._id,
    }));


    callback(null, {events});
}