import { Router } from "express";
import * as drugController from "../controllers/drugController.ts";

const router = Router();

router.post("/drug", drugController.createDrug);
router.put("/drug/:id", drugController.updateDrug);
router.get("/drug", drugController.getAllDrugs);
router.get("/drug/:id", drugController.getDrugById);
router.delete("/drug/:id", drugController.deleteDrug);

export default router;
