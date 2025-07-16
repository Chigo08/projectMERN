import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    menuOrdered: [
      {
        menu: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      min: 0,
    },
    totalQuantity: {
      type: Number,
      min: 0,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

orderSchema.pre("save", async function (next) {
  let priceTotal = 0;
  let quantityTotal = 0;
  try {
    for (const item of this.menuOrdered) {
      const menu = await mongoose.model("Menu").findById(item.menu);
      priceTotal += menu.price * item.quantity;
      quantityTotal += item.quantity;
    }
    this.totalPrice = priceTotal;
    this.totalQuantity = quantityTotal;

    next();
  } catch (error) {
    next(error);
  }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
