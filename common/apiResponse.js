const apiResponse = (status, message, response) => {
    return {
        httpStatus: status,
        httpStatusCode: status,
        message: message,
        response: response
    }
}


module.exports = {
    apiResponse
}