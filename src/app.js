import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import routes from "./routes/indexRouter.js"
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

export const db = mongoClient.db();

app.use(routes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
