import { Router } from "express";
import { postItem } from "../controllers/user.controller";

const router = Router()

router.get('/:name')

router.post('/login')

router.post('/register', postItem);

export default router