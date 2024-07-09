import { Router } from "express";
import * as orderController from "../controllers/orderController.ts";
import { authenticationToken } from "../middleware/authMiddleware.ts";

const router = Router();

router.post("/order", authenticationToken, orderController.createOrder);

export default router;
