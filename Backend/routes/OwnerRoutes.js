const OwnerController = require("../controllers/OwnerController");

const express = require("express");

const Router = express.Router();

Router.post("/Register", OwnerController.OwnerRegister);
Router.post("/Login", OwnerController.OwnerLogin);

module.exports = Router;
