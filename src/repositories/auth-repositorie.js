import { db } from "../app";

async function signUp(name, email, hash){

  await db.collection("cadastro").insertOne({
    name,
    email,
    senha: hash,
  });

}
async function newSession(userId, name, token){
    const user = {
        userId,
        name,
        token
      };

    await db.collection("sessions").insertOne({
        userId,
        name,
        token
      });

      return user;

}
async function emailExist(email){
    const emailExist = await db
    .collection("cadastro")
    .findOne({ email: email });

    return emailExist
}

async function signIn(){

}

export const authRepositorie = {
    signIn,
    signUp,
    emailExist,
    newSession
}

