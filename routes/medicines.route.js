import { Router } from "express";
import { medicineController } from "../controllers/medicines.controller.js";

const medicineRouter = Router();
//Admin routes 
medicineRouter.get('/admin', medicineController.getMedicine);
medicineRouter.post('/admin', medicineController.addMedicine)
medicineRouter.patch('/admin/:id', medicineController.updateMedicine)
medicineRouter.delete('/admin/:id', medicineController.deleteMedicine)

//user routes
medicineRouter.get('/', medicineController.getMedicineForUser)
medicineRouter.get("/category/:id", medicineController.getMedicineForUserByCategory);
medicineRouter.get("/:id", medicineController.getMedicineForUserId);

export{medicineRouter}