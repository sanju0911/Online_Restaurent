const Owner = require("../models/Owner");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();



const verify = async (req, resizeBy, next) => {
  const token = req.headers.token;
  if (!token) {
    return resizeBy.status(401).json({ error: "token is required" });
  }
  try {
    const verified = jwt.verify(token, process.env.SECRET);

    const OwnerID = verified.OwnerID;
    const Owner = await Owner.findById(OwnerID);

    if (!Owner) {
      return res.status(404).json({ error: "owner not found" });
    }
    req.OwnerID = Owner._id;
    next();
  } catch (error) {
    return res.status(500).json({ error: " token Invalid " });
  }
};

module.exports = verify;
