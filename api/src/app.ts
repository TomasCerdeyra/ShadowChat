
import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectMongodb from "./config/connectMongo.config";
import userRoute from './routes/user.routes'
import routerChat from "./routes/chat.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectMongodb();

app.get('/', (req: Request, res: Response) => {
    res.redirect("/register");
})

app.use('/', userRoute);
app.use('/chat', routerChat);

app.get('*', (req: Request, res: Response) => {
    res.status(404).json({ message: 'Route not found' });
})


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log('Server up!'));