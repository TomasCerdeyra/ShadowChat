import { Router } from "express";
import { getAddItem, getCreateItem, postDeleteItem, postItemChat,  } from "../controllers/grup.controller";
import checkAuth from "../middlewares/checkAuth";

const router = Router();

router.get('/:mainUser', checkAuth, getCreateItem)
router.post('/:idGroup', checkAuth, getAddItem)

router.post('/deleteUser/:idGroup', checkAuth, postDeleteItem)

router.post('/addMessge/:idGroup', checkAuth, postItemChat);


export default router