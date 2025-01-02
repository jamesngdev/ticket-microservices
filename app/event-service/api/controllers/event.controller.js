const {createEventUseCase, listEventUseCase} = require("../../applications/use-cases");
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