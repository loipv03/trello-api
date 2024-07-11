import { Request, Response, NextFunction } from 'express';

export interface IError {
    status?: number,
    message?: string | string[]
}

const errorHandler = (err: IError, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || 500
    const message = err.message || "Internal Server Error"

    res.status(status).json({
        status,
        message
    });
};

export default errorHandler;