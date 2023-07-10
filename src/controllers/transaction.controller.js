import { schemaTransacao } from "../schemas/schema.js";
import { db } from "../app.js";
import dayjs from "dayjs";

const date = dayjs().locale("pt-br").format("DD/MM")

export async function newTransaction(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const { value, description, userId } = req.body;
  const { tipo } = req.params;

  if (token === null) {
    res.sendStatus(401);
    return;
  }

  const validation = schemaTransacao.validate(value, { abortEarly: false });
  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(422).send("Digite um número válido");
  }

  try {
    const verificaToken = await db
      .collection("sessions")
      .findOne({ token: token });
    if (!verificaToken) return res.status(401).send("Usuario não está logado");
    await db.collection(`transacoes`).insertOne({
      type: tipo,
      value,
      userId: userId,
      description,
      date: date,
    });
    res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function searchTransaction(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const { userId } = req.params;

  try {
    const verificaToken = await db
      .collection("sessions")
      .findOne({ token: token });
    if (!verificaToken) return res.status(401).send("Usuario não está logado");

    const buscaTransacao = await db
      .collection(`transacoes`)
      .find({ userId: userId })
      .toArray();

    res.send(buscaTransacao);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
