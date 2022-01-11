const log = require('../logger');

const originalErrorHandler = (error, req, res, next) => {
    log.error(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
}

module.exports = {
    originalErrorHandler: originalErrorHandler
};