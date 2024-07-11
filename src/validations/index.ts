import Joi, { ValidationErrorItem, ValidationResult } from 'joi'
import { Request, Response, NextFunction } from 'express';
import { IError } from '../middlewares/validation';

const validate = (schema: Joi.ObjectSchema) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const { error }: ValidationResult = schema.validate(req.body, { abortEarly: false });
        if (error) {
            next({
                status: 400,
                message: error.details.map((err: ValidationErrorItem) => err.message)
            } as IError);
        }
        next()
    };
};

export default validate