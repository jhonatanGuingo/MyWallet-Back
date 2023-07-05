import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import Joi from "joi";
import dayjs from "dayjs";
import bcrypt from "bcrypt"

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {
  await mongoClient.connect();
  console.log("MongoDB conectado!");
} catch (err) {
  (err) => console.log(err.message);
}

const db = mongoClient.db();

const schemaName = Joi.string().required();
const schemaEmail = Joi.string().email().required();
const schemaSenha = Joi.string().required().min(3);


app.post("/cadastro", async (req, res) => {
    const {name, email, senha} = req.body;

    const hash = bcrypt.hashSync(senha,10)

    const validationEmail = schemaEmail.validate(email, { abortEarly: false });
    if (validationEmail.error) {
      const errors = validationEmail.error.details.map((detail) => detail.message);
      return res.status(422).send("Insira um e-mail válido");
    }
    const validationName = schemaName.validate(name, { abortEarly: false });
    if (validationName.error) {
      const errors = validationName.error.details.map((detail) => detail.message);
      return res.status(422).send("Preencha o campo nome");
    }

    const validationSenha = schemaSenha.validate(senha, { abortEarly: false });
    if (validationSenha.error) {
      const errors = validationSenha.error.details.map((detail) => detail.message);
      return res.status(422).send("A senha deve possuir mais de 3 caracteres");
    }
    

    try {
        const emailExist = await db.collection("cadastro").findOne({email: email});
        if (emailExist) return res.status(409).send("E-mail já cadastrado");

        await db.collection("cadastro").insertOne({
            name,
            email,
            senha: hash
        });
        res.sendStatus(201)
    } catch (err) {
        return res.status(500).send(err.message);
    }
})

app.post("/signIn", async (req, res) => {
    const {email, senha} = req.body;

    const validationEmail = schemaEmail.validate(email, { abortEarly: false });
    if (validationEmail.error) {
      const errors = validationEmail.error.details.map((detail) => detail.message);
      return res.status(422).send("Insira um e-mail válido");
    }

    const validationSenha = schemaSenha.validate(senha, { abortEarly: false });
    if (validationSenha.error) {
      const errors = validationSenha.error.details.map((detail) => detail.message);
      return res.status(422).send("Digite sua senha");
    }

    try {
        const verificaEmail = await db.collection("cadastro").findOne({email: email})
        if (!verificaEmail) return res.sendStatus(404)
        if (verificaEmail && bcrypt.compareSync(senha, verificaEmail.senha)){
            res.status(200).send("token")
        }else{
            res.sendStatus(401)
        }
        
    } catch (err) {
        return res.status(500).send(err.message);
    }
})
const PORT = 5000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));