const mongoose = require("mongoose");

const RestuarentSchema = new mongoose.Schema({
  restuarentname: {
    type: String,
    required: true,
    unique: true,
  },
  area: {
    type: String,
    required: true,
  },
  category: [
    {
      type: String,
      enum: ["veg", "non-veg"],
    },
  ],
  region: [
    {
      type: String,
      enum: ["north", "south", "east", "west"],
    },
  ],
  offer: {
    type: String,
  },
  image: {
    type: String,
  },
  Owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
  },
});

const Restuarent = mongoose.model("Restuarent", RestuarentSchema);

module.exports = Restuarent;
