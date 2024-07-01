import { Request, Response, NextFunction } from 'express';
import { ValidationError, ValidationErrorItem } from 'joi';

const errorHandler = (err: ValidationError, _req: Request, res: Response, _next: NextFunction) => {
    res.status(400).json({
        status: res.statusCode,
        message: err.details?.map((err: ValidationErrorItem) => err.message) || err?.message,
    });
};

export default errorHandler;