import { Router } from "express";
import { categoriesController } from "../controllers/categories.controller.js";

const categoriesRouter = Router();

categoriesRouter.get('/', categoriesController.getCategories);
categoriesRouter.post('/', categoriesController.addCategory);
categoriesRouter.patch('/:id', categoriesController.updateCategory)
categoriesRouter.delete('/:id', categoriesController.deleteCategory)

export{categoriesRouter}