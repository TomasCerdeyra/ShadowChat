import { Router } from "express";
import { getItem, login, postItem } from "../controllers/user.controller";
import checkAuth from "../middlewares/checkAuth";

const router = Router()

router.get('/user/:email', checkAuth, getItem);

router.post('/login', login);

router.post('/register', postItem);

export default router