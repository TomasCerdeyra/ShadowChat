import { Router } from "express";
import { getAddItem, getCreateItem, postDeleteItem } from "../controllers/grup.controller";
import checkAuth from "../middlewares/checkAuth";

const route = Router();

route.get('/:mainUser', checkAuth, getCreateItem)
route.post('/:idGroup', checkAuth, getAddItem)

route.post('/deleteUser/:idGroup', checkAuth, postDeleteItem)


export default route