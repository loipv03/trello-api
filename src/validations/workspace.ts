import Joi from 'joi';

export const workspaceSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).optional(),
    visibility: Joi.string().valid('private', 'public').default('private'),
    members: Joi.array().items(
        Joi.object({
            userId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
            role: Joi.string().valid('admin', 'normal', 'observer').default('normal'),
        })
    ).optional(),
    boards: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)).optional(),
});
