import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";

dotenv.config();

const app = express();

const mongoClient = new MongoClient(process.env.MONGO_URL);
let db;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


try {
  await mongoClient.connect();
  db = mongoClient.db();
} catch (error) {
  console.log("Um erro inesperado ocorreu no servidor!");
}


const upload = multer({ dest: 'uploads/' });

// Configuramos o upload como um middleware que
// espera um arquivo cujo a chave é "foto"
app.post('/cadastro', upload.single('foto'), (req, res) => {
    const { nome, site } = req.body;
    res.json({ nome, site });
});

app.listen(5000);







