class HTTPUtilities {
    constructor() {
    }

    successResponse = (response, statusCode, respData = {}) => {
        response.status(statusCode).json(respData);
    }

    generateError = (errorCode = Object = { descripton: String, status: Number, code: String }, errData = []) => {
        const error = new Error(errorCode.code);
        error.statusCode = errorCode.status;
        error.data = errData;
        throw error;
    };

    testFunc = () => {
        console.log("Test function")
    }
}

module.exports = {
    HTTPUtilities: HTTPUtilities,
    httpUtilities: new HTTPUtilities()
};


