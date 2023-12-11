
import dayjs from "dayjs";
import { transactionService } from "../services/transaction-services.js";

const date = dayjs().locale("pt-br").format("DD/MM");

export async function newTransaction(req, res) {
  const { value, description, userId } = req.body;
  const { tipo } = req.params;
  const newTransaction = transactionService.newTransaction(
    value,
    description,
    userId,
    tipo
  );
  return res.sendStatus(200);
}

export async function searchTransaction(req, res) {
  const { userId } = req.params;
  const search = transactionService.searchTransaction(userId);
  return res.send(search);
}
