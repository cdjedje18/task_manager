const apiResponse = (status, message, response) => {
    return {
        httpStatusCode: status,
        message: message,
        response: response
    }
}


module.exports = {
    apiResponse
}