import Joi from "joi";

const boardSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    workspace: Joi.string().required(),
    members: Joi.array().items(
        Joi.object({
            userId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
            role: Joi.string().valid('admin', 'normal', 'observer').default('normal'),
        })
    ).optional(),
    visibility: Joi.string().valid('private', 'public').default('private'),
});

export default boardSchema