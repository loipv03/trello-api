import { Request, Response, NextFunction } from 'express';
import Joi, { ValidationErrorItem, ValidationResult } from 'joi';
import { IError } from '../interfaces/error';

const validate = (schema: Joi.ObjectSchema) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const { error }: ValidationResult = schema.validate(req.body, { abortEarly: false });
        if (error) {
            let message: string[] = error.details.map((err: ValidationErrorItem) => err.message)
            return next({
                status: 400,
                message
            } as IError);
        }
        next()
    };
};

export default validate