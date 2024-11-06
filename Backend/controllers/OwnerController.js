const Owner = require("../models/Owner");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();

const OwnerRegister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const OwnerEmail = await Owner.findOne({ email });

    if (OwnerEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    const NewOwner = await Owner.create({
      username,
      email,
      password: hashedpassword,
    });

    await NewOwner.save();

    return res.status(201).json({ message: "registered Sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const OwnerLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const OwnerEmail = await Owner.findOne({ email });
    if (!OwnerEmail) {
      return res.status(400).json({ message: "Email not found" });
    }
    const validPassword = await bcrypt.compare(password, OwnerEmail.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ OwnerID: Owner._id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "login Succesfull", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

module.exports = {
  OwnerRegister,
  OwnerLogin,
};
