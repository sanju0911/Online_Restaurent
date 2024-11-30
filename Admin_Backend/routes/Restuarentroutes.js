const express = require("express");
const RestuarentController = require("../controllers/RestuarentController");
const verify = require("../middleware/Auth");

const Router = express.Router();

Router.post("/Add", verify, RestuarentController.AddRestuarent);

Router.get("/uploads/:imageName", (req, res) => {
  const ImageName = req.params.imageName;
  res.headersSent("Content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, "..", "uploads", ImageName));
});

Router.delete("/:RestuarentId", RestuarentController.deleteResturarent);

module.exports = Router;
