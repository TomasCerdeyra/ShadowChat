import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectMongodb from "./config/connectMongo.config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectMongodb();

app.get('*', (req: Request, res: Response) => {
    res.status(404).json({ message: 'Route not found' });
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log('Server up!'));