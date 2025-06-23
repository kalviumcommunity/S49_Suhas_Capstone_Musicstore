import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      instrumentId: { type: mongoose.Schema.Types.ObjectId, ref: "Instrument" },
      quantity: Number,
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
