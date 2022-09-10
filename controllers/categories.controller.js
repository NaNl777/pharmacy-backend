import { Category } from "../models/Category.model.js";

const categoriesController = {
  addCategory: async (req, res) => {
    try {
      const addCategory = await Category.create({ // Можно было использовать деструктуризацию const {name} = req.body
        name: req.body.name,
      });
      return res.json(addCategory);
    } catch (error) {
      console.log(error.message);
    }
  },

  getCategories: async(req, res) => {
    try {
        const getCategories = await Category.find();
        return res.json(getCategories)
    } catch (error) {
        console.log(error.message)
    }
  },
 
   updateCategory: async(req, res) => {
    try {
        const updateCategory = await Category.findByIdAndUpdate(req.params.id, req.body)
        return res.json(updateCategory)
    } catch (error) {
        console.log(error.message)
    }
   },

   deleteCategory: async(req, res) => {
    try {
        const deleteCategory = await Category.findByIdAndDelete(req.params.id);
        return res.json(deleteCategory)
    } catch (error) {
        console.log(error.message)
    }
   }
};

export{categoriesController}
