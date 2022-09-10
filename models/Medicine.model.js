import mongoose from "mongoose";

const medicineSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    categoryId: {
      ref: "Category",
      type: mongoose.Schema.Types.ObjectId,
    },

    nedeedRecipe: {
      type: Boolean,
      default: false
    },
  },
  { timestamp: true }
);

const Medicine = mongoose.model("Medicine", medicineSchema)

export{Medicine}