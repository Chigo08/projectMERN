import Menu from "../models/Menu.js";
import mongoose from "mongoose";

export const getMenu = async (req, res) => {
  try {
    const menus = await Menu.find({});
    res.status(200).json(menus);
  } catch (error) {
    console.log("Error in getMenu controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createMenu = async (req, res) => {
  try {
    const { menuName, price, menuDescription } = req.body;
    const menuUpdate = new Menu({ menuName, price, menuDescription });
    const savedMenu = await menuUpdate.save();
    res.status(201).json(savedMenu);
  } catch (error) {
    console.error("Error in createMenu controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid ID" });

    const { menuName, price, menuDescription } = req.body;
    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      {
        menuName,
        price,
        menuDescription,
      },
      { new: true }
    );

    if (!updatedMenu) {
      return res.status(404).json({ message: "Menu tidak ditemukan" });
    }

    res.status(200).json(updatedMenu);
  } catch (error) {
    console.error("Error in updateMenu:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid ID" });

    const deletedMenu = await Menu.findByIdAndDelete(id);
    if (!deletedMenu)
      return res.status(404).json({ message: "Menu tidak ditemukan" });

    res.status(200).json({ message: "Menu berhasil dihapus" });
  } catch (error) {
    console.error("Error in deleteMenu: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
