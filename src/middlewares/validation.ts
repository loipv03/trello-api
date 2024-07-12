import { Request, Response, NextFunction } from 'express';
import { IError } from '../interfaces/error';
import Joi, { ValidationErrorItem, ValidationResult } from 'joi';


const validate = (schema: Joi.ObjectSchema) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const { error }: ValidationResult = schema.validate(req.body, { abortEarly: false });
        if (error) {
            let message: string[] = error.details.map((err: ValidationErrorItem) => err.message)
            next({
                status: 400,
                message
            } as IError);
        }
        next()
    };
};

const errorHandler = async (err: IError, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || 500
    const message = err.message || "Internal Server Error"

    return res.status(status).json({
        status,
        message
    });
};

export default errorHandler;
export { validate }