const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
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
  orderDate: {
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

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;
