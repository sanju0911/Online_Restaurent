const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  profilePic: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    required: true,
  },
  alternateEmail: {
    type: String,
    required: false,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  ],
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
