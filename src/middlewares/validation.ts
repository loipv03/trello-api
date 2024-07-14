import { Request, Response, NextFunction } from 'express';
import { IError } from '../interfaces/error';

const errorHandler = async (err: IError, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || 500
    const message = err.message || "Internal Server Error"

    return res.status(status).json({
        status,
        message
    });
};

export default errorHandler;