import Order from "../models/Order.js";
import Menu from "../models/Menu.js";
import mongoose from "mongoose";

export const getOrder = async (_, res) => {
  try {
    const order = await Order.find({});
    res.status(200).json(order);
  } catch (error) {
    console.log("Error in getOrder controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createOrder = async (req, res) => {
  const { customerName, menuOrdered } = req.body;
  if (!menuOrdered || menuOrdered.length === 0) {
    return res.status(404).json({ message: "Tidak ada menu" });
  }
  try {
    for (const item of menuOrdered) {
      const menuExists = await Menu.findById(item.menu);
      if (!menuExists) {
        return res.status(404).json({ message: "Menu tidak ditemukan" });
      }
    }

    const newOrder = await Order.create({
      customerName,
      menuOrdered,
    });

    const populatedOrder = await Order.findById(newOrder._id).populate(
      "menuOrdered.menu"
    );

    res.status(201).json(populatedOrder);
  } catch (error) {
    console.log("Error in createOrder", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerName, menuOrdered } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid ID" });

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        customerName,
        menuOrdered,
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Pesanan tidak ditemukan" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.log("Error in updateOrder controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid ID" });

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder)
      return res.status(404).json({ message: "Pesanan tidak ditemukan" });

    res.status(200).json({ message: "Pesanan berhasil dihapus" });
  } catch (error) {
    console.log("Error in deleteOrder controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
