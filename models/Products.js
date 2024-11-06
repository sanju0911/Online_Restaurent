const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: [
    {
      type: String,
      enum: ["veg", "non-veg"],
    },
  ],
  image: {
    type: String,
  },
  bestseller: {
    type: String,
  },
  description: {
    type: String,
  },
  restuarent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restuarent",
    },
  ],
});

module.exports = mongoose.model("Product", ProductSchema);
