import { User } from "../models/User.model.js";
import { Medicine } from "../models/Medicine.model.js";

const usersController = {
  //All CRUD operation admin
  getUsers: async (req, res) => {
    try {
      const getUsers = await User.find({}).populate("storeBasket");
      return res.json(getUsers);
    } catch (error) {
      console.log(error.message);
    }
  },

  addUser: async (req, res) => {
    try {
      const addUser = await User.create({
        name: req.body.name,
        price: req.body.price,
        recipe: req.body.recipe,
        wallet: req.body.wallet,
      });
      return res.json(addUser);
    } catch (error) {
      console.log(error.message);
    }
  },

  updateUser: async (req, res) => {
    try {
      const updateUser = await User.findByIdAndUpdate(req.params.id, req.body);
      return res.json(updateUser);
    } catch (error) {
      console.log(error.message);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deleteUser = await User.findByIdAndDelete(req.params.id);
      return res.json(deleteUser);
    } catch (error) {
      console.log(deleteUser);
    }
  },

  //functions user interface

  addMoneyForUser: async (req, res) => {
    const user = await User.findById(req.params.id);
    let money = user.wallet + req.body.money; //Можно было сделать по другому

    try {
      const addMoneyForUser = await user.update({
        $set: { wallet: money },
      });
      return res.json(addMoneyForUser); //Бабки на месте=) +
    } catch (error) {
      console.log(error.message);
    }
  },

  addMedicineForBaskets: async (req, res) => {
    // Метод который добавляет лекарства в корзину,  после добавление лекарства в корзину => общая сумма должна увеличиваться а корзина пополниться
    const user = await User.findById(req.params.id);
    const medicine = await Medicine.findById(req.body.medicine);

    if ((medicine.nedeedRecipe === true) && (user.recipe === false)) {
      return res.json(
        "К сожалению, мы не можем вам продать это лекарства. Для покупки данного лекарства нужен рецепт!"
      );
    }

    let entireTotal = user.total + medicine.price;
    // Общая сумма лекарства, которые предстоить оплатить

    try {
      const addMedicineForBaskets = await user.updateOne({
        $set: {total: entireTotal},
        $addToSet: {storeBasket: req.body.medicine}, //Тут пушем в массив, то есть используем метод, так чтобы она не смогла добавляться повторно
      });
      res.json(addMedicineForBaskets);
    } catch (error) {
      console.log(error.message);
    }
  },

  deleteMedecineByBasket: async (req, res) => {
    const user = await User.findById(req.params.id);
    const medicine = await Medicine.findById(req.body.medicine);

    let sumAfterDeletedMedicine = user.total - medicine.price;

    try {
      const deleteMedecineByBasket = await user.update({
        $pull: {
          storyBasket: req.body.storyBasket,
        },
        $set: {
          total: sumAfterDeletedMedicine,
        },
      });
      return res.json(deleteMedecineByBasket);
    } catch (error) {
      console.log(error.message);
    }
  },

  clearOfBasket: async (req, res) => {
    const user = await User.findById(req.params.id);

    try {
      const clearOfBasket = await user.update({
        // Таким образом корзина будет пустой, так как использовал метод для обновление set
        $set: {
          total: 0,
          storyBasket: [],
        },
      });
      res.json(clearOfBasket); //И получаем нашу пустую корзину
    } catch (error) {
      console.log(error.message);
    }
  },

  buyMedicineForUser: async (req, res) => {
    //Покупка лекарства для пользавателя
    const user = await User.findById(req.params.id);

    if (user.wallet < user.total) {
      return res.json(
        "У вас недостаточно денег, чтобы купить все эти лекарства!"
      );
    }

    let sum = user.wallet - user.total;

    try {
      const buyMedicineForUser = await user.updateOne({
        $set: {
          total: 0,
          storeBasket: [],
          wallet: sum,
        },
      });
      return res.json(buyMedicineForUser);
    } catch (error) {
      console.log(error.message);
    }
  },

  //
};

export{usersController}
