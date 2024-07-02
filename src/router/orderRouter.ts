import { Router } from "express";
import * as orderController from "../controllers/orderController.ts";

const router = Router();

router.post("/order", orderController.createOrder);

export default router;
