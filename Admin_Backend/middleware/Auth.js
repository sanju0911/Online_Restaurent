const jwt = require("jsonwebtoken");
const Owner = require("../models/Owner");

const verify = async (req, res, next) => {
  try {
    // Log the Authorization header
    console.log("Authorization Header:", req.headers.authorization);

    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      console.log("Token is missing or malformed");
      return res.status(401).json({ error: "Token is malformed or missing" });
    }
    console.log("Extracted Token:", token);

    // Verify the token
    const verified = jwt.verify(token, process.env.SECRET);
    console.log("Verified Token Payload:", verified);

    const OwnerID = verified.OwnerID;
    const owner = await Owner.findById(OwnerID);

    if (!owner) {
      console.log("Owner not found");
      return res.status(404).json({ error: "Owner not found" });
    }

    req.OwnerID = owner._id; // Attach owner ID to the request
    next();
  } catch (error) {
    console.log("Error during token verification:", error.message);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid Token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    }
    return res.status(500).json({ error: "Token verification failed" });
  }
};

module.exports = verify;
