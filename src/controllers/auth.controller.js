
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../app.js";
import { schemaEmail, schemaName, schemaSenha } from "../schemas/schema.js";

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

  try {
    const emailExist = await db
      .collection("cadastro")
      .findOne({ email: email });
    if (emailExist) return res.status(409).send("E-mail já cadastrado");

    await db.collection("cadastro").insertOne({
      name,
      email,
      senha: hash,
    });
    res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
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

  try {
    const verificaEmail = await db
      .collection("cadastro")
      .findOne({ email: email });
    if (!verificaEmail) return res.sendStatus(404);
    if (verificaEmail && bcrypt.compareSync(senha, verificaEmail.senha)) {
      const token = uuid();
      const user = {
        userId: verificaEmail._id,
        name: verificaEmail.name,
        token: token,
      };
      await db.collection("sessions").insertOne({
        userId: verificaEmail._id,
        name: verificaEmail.name,
        token: token,
      });
      res.status(200).send(user);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function logOut(req, res){

}
