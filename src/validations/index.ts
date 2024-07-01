import Joi, { ValidationResult } from 'joi'
import { Request, Response, NextFunction } from 'express';

const validate = (schema: Joi.ObjectSchema) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const { error }: ValidationResult = schema.validate(req.body, { abortEarly: false });
        if (error) {
            next(error)
        }
        next()
    };
};

export default validate