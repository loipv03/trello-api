import Joi, { ValidationErrorItem, ValidationResult } from 'joi'
import { Request, Response, NextFunction } from 'express';
import { IError } from '../interfaces/error';
import deleteFile from '../utils/deleteFile';

const validate = (schema: Joi.ObjectSchema) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const { error }: ValidationResult = schema.validate(req.body, { abortEarly: false });
        if (error) {
            let message = error.details.map((err: ValidationErrorItem) => err.message)
            if (req.file) {
                deleteFile(req.file.filename)
            }

            next({
                status: 400,
                message
            } as IError);
        }
        next()
    };
};

export default validate