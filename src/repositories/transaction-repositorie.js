import { db } from "../app";

async function newTransaction(value, description, userId, tipo){
    await db.collection(`transacoes`).insertOne({
        type: tipo,
        value,
        userId: userId,
        description,
        date: date,
      });
}

async function searchTransaction(userId){
    const search = await db
      .collection(`transacoes`)
      .find({ userId: userId })
      .toArray();
    return search
}

export const transactionRepositorie = {
    newTransaction,
    searchTransaction
}