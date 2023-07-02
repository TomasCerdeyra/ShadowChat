import { Router } from "express";
import { getAddItem, getCreateItem } from "../controllers/grup.controller";
import checkAuth from "../middlewares/checkAuth";

const route = Router();

route.get('/:mainUser', checkAuth, getCreateItem)
route.post('/:idGroup', checkAuth, getAddItem)


export default route