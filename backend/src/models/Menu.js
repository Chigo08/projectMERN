import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  menuName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  menuDescription: {
    type: String,
    default: "No Description Included",
  },
});

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
