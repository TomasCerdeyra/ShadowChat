import express from "express";
import cors from 'cors'
import "dotenv/config";
import userRoute from './routes/user.routes'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', userRoute)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log('Server up!'));