const successResponse = (res, data, message) => {
    return res.status(200).json({
        status: 'success',
        message,
        data,
    });
}


const errorResponse = (res, message, status = 500) => {
    return res.status(status).json({
        status: 'error',
        message,
    });
}


module.exports = {
    successResponse,
    errorResponse
}


