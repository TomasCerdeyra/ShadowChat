import { Router } from "express";
import { createItem, postItems } from "../controllers/chat.controller";
import checkAuth from "../middlewares/checkAuth";

const router = Router()

router.get('/createChat/:user1/:user2', checkAuth, createItem);

router.post('/sendMessage/:id_chat/', checkAuth, postItems)

export default router;