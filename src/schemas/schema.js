import Joi from "joi";
export const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().required().min(3),
})

export const schemaTransaction = Joi.number().required().positive().precision(2);

export const schemaLogin = Joi.object({
    email: Joi.string().email().required(),
    senha: Joi.string().required().min(3),
})