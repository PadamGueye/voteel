const createNotFoundError = (entity, message = 'Not Found') => {
    console.log("createNotFoundError:");
    const error = new Error(`${entity} ${message}`);
    error.statusCode = 404;
    return error;
};

const createValidationError = (entity, message = 'Validation Error') => {
    console.log("createValidationError:");
    const error = new Error(`${entity} ${message}`);
    error.statusCode = 400;
    return error;
};

module.exports = {
    createNotFoundError,
    createValidationError,
};
