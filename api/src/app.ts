import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log('Server up!'));