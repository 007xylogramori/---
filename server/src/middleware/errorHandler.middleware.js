import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        console.log(err)
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
        });
    }
    return res.status(500).json({
        success: false,
        message: "An unexpected error occurred",
        errors: [],
    });
};

export default errorHandler;
