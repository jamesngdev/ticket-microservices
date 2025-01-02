function promisifyGrpcMethod(client, methodName) {
    return (payload) => {
        return new Promise((resolve, reject) => {
            client[methodName](payload, (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    };
}

module.exports = {
    promisifyGrpcMethod
}