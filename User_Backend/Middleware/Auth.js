const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const Auth = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const secretKey = process.env.SECRET;
    const decoded = jwt.verify(token, secretKey);

    req.user = decoded;

    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = Auth;
