const {getGrpcClient} = require("../../../../libs/core/grpc-client");
const {promisifyGrpcMethod} = require("../../../../libs/utils/promise-grpc-method");

exports.createOrder = async (payload) => {
    const eventClient = getGrpcClient("event")

    const response = await promisifyGrpcMethod(eventClient, "getEventById")({
        eventId: payload.eventId
    })
   
    console.log(response)
    return null
}
