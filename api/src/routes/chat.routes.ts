import { Router } from "express";
import { createItem } from "../controllers/chat.controller";
import checkAuth from "../middlewares/checkAuth";

const router = Router()

router.get('/createChat/:user1/:user2', checkAuth, createItem);

export default router;