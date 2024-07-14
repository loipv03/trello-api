import Joi from 'joi';

const siginupSchema = Joi.object({
    userName: Joi
        .string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(6)
        .required(),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required(),
    avatar: Joi.string()
        .uri()
        .default(''),
    isActive: Joi.boolean().default(false),
});

const signinSchema = Joi.object({
    email: siginupSchema.extract('email'),
    password: siginupSchema.extract('password')
});

const bodySchema = Joi.object().keys({}).unknown(false);

export { siginupSchema, signinSchema, bodySchema }
