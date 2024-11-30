const express = require("express");
const router = express.Router();
const Auth = require("../Middleware/Auth");
const UserController = require("../Controllers/UserController");
const CartController = require("../Controllers/CartController");

router.post("/register", UserController.Register);
router.post("/login", UserController.Login);
router.post("/profile", Auth, UserController.setProfile);
router.get("/profile", Auth, UserController.getProfile);
router.post("/orders", Auth, UserController.setOrders);
router.get("/orders", Auth, UserController.getOrders);
router.post("/addToCart", Auth, CartController.addToCart);
router.get("/getCartItems", Auth, CartController.getCartItems);
router.delete("/deleteCartItem/:id", Auth, CartController.deleteCartItem);

module.exports = router;
