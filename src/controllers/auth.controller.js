import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../app.js";
import { schemaEmail, schemaName, schemaSenha } from "../schemas/schema.js";
import { authRepositorie } from "../repositories/auth-repositorie.js";

export async function signUp(req, res) {
  const { name, email, senha } = req.body;

  const hash = bcrypt.hashSync(senha, 10);

  const validationEmail = schemaEmail.validate(email, { abortEarly: false });
  if (validationEmail.error) {
    const errors = validationEmail.error.details.map(
      (detail) => detail.message
    );
    return res.status(422).send("Insira um e-mail válido");
  }
  const validationName = schemaName.validate(name, { abortEarly: false });
  if (validationName.error) {
    const errors = validationName.error.details.map((detail) => detail.message);
    return res.status(422).send("Preencha o campo nome");
  }

  const validationSenha = schemaSenha.validate(senha, { abortEarly: false });
  if (validationSenha.error) {
    const errors = validationSenha.error.details.map(
      (detail) => detail.message
    );
    return res.status(422).send("A senha deve possuir mais de 3 caracteres");
  }

  const emailExist = await authRepositorie.emailExist(email);
  if (emailExist) return res.status(409).send("E-mail já cadastrado");

  const newUser = await authRepositorie.signUp(name, email, hash);

  res.sendStatus(201);
}

export async function signIn(req, res) {
  const { email, senha } = req.body;

  const validationEmail = schemaEmail.validate(email, { abortEarly: false });
  if (validationEmail.error) {
    const errors = validationEmail.error.details.map(
      (detail) => detail.message
    );
    return res.status(422).send("Insira um e-mail válido");
  }

  const validationSenha = schemaSenha.validate(senha, { abortEarly: false });
  if (validationSenha.error) {
    const errors = validationSenha.error.details.map(
      (detail) => detail.message
    );
    return res.status(422).send("Digite sua senha");
  }

  const emailExist = await authRepositorie.emailExist(email);

  if (!emailExist) return res.sendStatus(404);

  if (emailExist && bcrypt.compareSync(senha, emailExist.senha)) {
    const token = uuid();
    const newSession = authRepositorie.newSession(
      emailExist._id,
      emailExist.name,
      token
    );
    return newSession;
  }

  return res.sendStatus(401);
}
