const errorMiddleware = (err, req, res, next) => {
    console.error("Error Handling Middleware:", err);

    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Une erreur est survenue !';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = errorMiddleware;
