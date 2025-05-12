const errorHandler = (err, req, res, next) => {
    console.error(err);

    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle Google-Specific Errors
    if (err.code) {
        switch (err.code) {
            case 401:
                message = 'Unauthorized: Invalid Google Credentials';
                break;
            case 403:
                message = 'Forbidden: Google API Access Denied';
                break;
            case 404:
                message = 'Not Found: Google Resource Not Available';
                break;
            case 'ECONNRESET':
                message = 'Connection Reset: Google API request failed';
                break;
            case 'ENOTFOUND':
                message = 'Google API Endpoint Not Found';
                break;
            default:
                message = `Google API Error: ${err.message}`;
                break;
        }
    }

    res.status(statusCode).json({
        success: false,
        message,
        error: process.env.NODE_ENV === 'development' ? err : undefined,
    });
};

export default errorHandler;
