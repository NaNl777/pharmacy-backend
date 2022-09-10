import { Medicine } from "../models/Medicine.model.js";

const medicineController = {
//CRUD operations for admin
  addMedicine: async (req, res) => {
    try {
      const addMedicine = await Medicine.create({
        name: req.body.name,
        price: req.body.price,
        nedeedRecipe: req.body.nedeedRecipe,
        categoryId: req.body.categoryId,
      });
      return res.json(addMedicine);
    } catch (error) {
      console.log(error.message);
    }
  },

  deleteMedicine: async (req, res) => {
    try {
      const deleteMedicine = await Medicine.findByIdAndDelete(req.params.id);
      return res.json(deleteMedicine);
    } catch (error) {
      console.log(res.json);
    }
  },

  updateMedicine: async(req, res) => {
    try {
        const updateMedicine = await Medicine.findByIdAndUpdate(req.params.id, req.body);
        return res.json(updateMedicine)
    } catch (error) {
        console.log(error.message)
    }
  },

  getMedicine: async(req, res) => {
    try {
        const getMedicine = await Medicine.find();
        return res.json(getMedicine)
    } catch (error) {
        console.log(error.message)
    }
  },

  //Functions for user

  getMedicineForUserByCategory: async(req, res) => {
    try {
        const data = await Medicine.find({categoryId: req.params.id}).populate("categoryId")
        return res.json(data)
    } catch (error) {
        console.log(error.message)
    }
  },

  getMedicineForUser: async(req, res) => {
    try {
        const getMedicineFor = await Medicine.find({}).populate({path: "categoryId", select: "name _id"});
        return res.json(getMedicineFor)
    } catch (error) {
        console.log(error.message)
    }
  },

  getMedicineForUserId: async(req, res) => {
    try {
        const data = await Medicine.findById(req.params.id).populate({path: "categoryId", select: "name _id"});
        return res.json(data)
    } catch (error) {
        console.log(error.message)
    }
  }
};

export{medicineController}