const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true,
  },
  itemPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  itemImage: {
    type: String,
    required: false,
    default: "",
  },
  addedToCart: {
    type: Date,
    default: Date.now,
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
