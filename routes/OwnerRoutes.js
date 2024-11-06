const OwnerController = require("../controllers/OwnerController");

const express = require("express");

const Router = express.Router();

Router.post("/Register", OwnerController.OwnerRegister);
Router.post("/Login", OwnerController.OwnerLogin);
Router.get("/Getall", OwnerController.getallOwners);
Router.get("/Get/:id", OwnerController.getOwnerById);

module.exports = Router;
