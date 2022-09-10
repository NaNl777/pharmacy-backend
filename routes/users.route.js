import { Router } from "express";
import { usersController } from "../controllers/users.controller.js";

const userRouter = Router();
//Admin routes
userRouter.get("/admin", usersController.getUsers);
userRouter.post("/admin", usersController.addUser);
userRouter.patch("/admin/:id", usersController.updateUser);
userRouter.delete("/admin/:id", usersController.deleteUser);

//user routes
userRouter.patch("/delete/:id", usersController.deleteMedecineByBasket);
userRouter.patch("/money/:id", usersController.addMoneyForUser);
userRouter.patch("/buy/:id", usersController.buyMedicineForUser);
userRouter.patch('/clear/:id', usersController.clearOfBasket);
userRouter.patch('/basket/:id', usersController.addMedicineForBaskets)

export { userRouter };
