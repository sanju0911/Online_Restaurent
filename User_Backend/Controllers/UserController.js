const mongoose = require("mongoose");
const User = require("../Models/User");
const Profile = require("../Models/Profile");
const Orders = require("../Models/Orders");
const Cart = require("../Models/Cart");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const Register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const setProfile = async (req, res) => {
  const { profilePic, address, alternateEmail, phoneNo } = req.body;
  const userId = req.user.userId;
  try {
    const newProfile = new Profile({
      profilePic,
      address,
      alternateEmail,
      phoneNo,
      user: userId,
    });
    await newProfile.save();
    res.status(201).json({ message: "Profile created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProfile = async (req, res) => {
  const userId = req.user.userId;
  try {
    const profile = await Profile.findOne({ user: userId })
      .populate("orders")
      .populate("cart");
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const setOrders = async (req, res) => {
  const { itemName, itemPrice, itemImage } = req.body;
  const userId = req.user.userId;
  try {
    const newOrder = new Orders({
      itemName,
      itemPrice,
      itemImage,
      user: userId,
    });
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", error: error.message });
  }
};

const getOrders = async (req, res) => {
  const userId = req.user.userId;
  try {
    const orders = await Orders.find({ user: userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  Register,
  Login,
  setProfile,
  getProfile,
  setOrders,
  getOrders,
};
