const successResponse = (res, data, message) => {
    return res.status(200).json({
        status: 'success',
        message,
        data,
    });
}


const errorResponse = (res, errorCode = 'UNKNOWN_ERROR', message = null, status = 500) => {
    return res.status(status).json({
        status: 'error',
        errorCode: errorCode,
        message: message || errorCode,
    });
}


module.exports = {
    successResponse,
    errorResponse
}


