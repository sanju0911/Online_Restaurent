const mongoose = require("mongoose");

const OwnerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  restuarent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restuarent",
    },
  ]
});

const Owner = mongoose.model("Owner", OwnerSchema);

module.exports = Owner;
