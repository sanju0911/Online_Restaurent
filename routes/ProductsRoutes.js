const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.post("/AddProduct/:restuarentId", ProductController.addProduct);

router.get("/:restuarentId/products", ProductController.getProductByRest);

router.get("/uploads/:imageName", (req, res) => {
  const ImageName = req.params.imageName;
  res.headersSent("Content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, "..", "uploads", ImageName));
});

router.delete("/productId", ProductController.deleteProduct);

module.exports = router;
