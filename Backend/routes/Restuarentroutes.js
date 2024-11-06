const express = require("express");
const RestuarentController = require("../controllers/RestuarentController");
const verify = require("../middleware/Auth");

const Router = express.Router();

Router.post("/Add", verify, RestuarentController.AddRestuarent);

module.exports = Router;
