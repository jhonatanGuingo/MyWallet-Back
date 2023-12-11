import { transactionRepositorie } from "../repositories/transaction-repositorie";

async function newTransaction(value, description, userId, tipo){
    const newTransaction = transactionRepositorie.newTransaction(value, description, userId, tipo);
}

async function searchTransaction(userId){
    const search = transactionRepositorie.searchTransaction(userId)
    return search
}

export const transactionService = {
    newTransaction,
    searchTransaction
}