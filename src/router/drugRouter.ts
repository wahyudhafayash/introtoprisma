import { Router } from "express";
import * as drugController from "../controllers/drugController.ts";
import { authenticationToken } from "../middleware/authMiddleware.ts";

const router = Router();

router.post("/drug", authenticationToken, drugController.createDrug);
router.put("/drug/:id", authenticationToken, drugController.updateDrug);
router.get("/drug", authenticationToken, drugController.getAllDrugs);
router.get("/drug/:id", authenticationToken, drugController.getDrugById);
router.delete("/drug/:id", authenticationToken, drugController.deleteDrug);

export default router;
