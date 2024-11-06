const express = require("express");
const RestuarentController = require("../controllers/RestuarentController");
const verifiedroute = require("../middleware/Auth");

const Router = express.Router();

Router.post("/Add", verifiedroute.verify, RestuarentController.AddRestuarent);

module.exports = Router;
