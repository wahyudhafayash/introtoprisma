import { Router } from "express";
import * as transactionController from "../controllers/transactionController.ts";

const router = Router();

router.post("/snap-transaction", transactionController.createSnapTransaction);

router.post(
  "/bank-transaction",
  transactionController.createBankTransferTransaction
);

export default router;
