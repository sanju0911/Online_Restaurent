const Owner = require("../models/Owner");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const verify = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }
  try {
    const verified = jwt.verify(token, process.env.SECRET);

    const OwnerID = verified.OwnerID;
    const owner = await Owner.findById(OwnerID);

    if (!owner) {
      return res.status(404).json({ error: "Owner not found" });
    }
    req.OwnerID = owner._id;
    next();
  } catch (error) {
    return res.status(500).json({ error: "Token is invalid" });
  }
};

module.exports = verify;
