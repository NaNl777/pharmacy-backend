import express from "express";
import mongoose from "mongoose";
import { categoriesRouter } from "./routes/categories.route.js";
import { userRouter } from "./routes/users.route.js";
import { medicineRouter } from "./routes/medicines.route.js";

const dbUrl = "mongodb+srv://zelim:Ru95@cluster0.09gco.mongodb.net/pharmacy";
const port = 3055;
const app = express();

app.use(express.json());
app.use('/admin/categories',  categoriesRouter)
app.use('/medicines', medicineRouter)
app.use('/users', userRouter)


const start = async (req, res) => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected..");
    app.listen(port, () => {
      console.log("Server has been started...");
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
