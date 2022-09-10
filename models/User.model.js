import mongoose from "mongoose";


const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    surname: String,

    recipe: {
        type: Boolean,
        default: false
    },

    wallet: {
        type: Number,
        default: 0
    },

    storeBasket:[
         {
        ref: "Medicine",
        type: mongoose.Schema.Types.ObjectId
     },
    ],
    total: {
        type: Number,
        default: 0
    }
  },
  { timestamp: true }
);

const User = mongoose.model("User", userSchema)

export{User}
