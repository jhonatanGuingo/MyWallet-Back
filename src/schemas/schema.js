import Joi from "joi";

export const schemaName = Joi.string().required();
export const schemaEmail = Joi.string().email().required();
export const schemaSenha = Joi.string().required().min(3);
export const schemaTransacao = Joi.number().required().positive().precision(2);