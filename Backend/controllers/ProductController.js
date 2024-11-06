const Product = require("../models/Products");
const multer = require("multer");
const Restuarent = require("../models/Restuarent");
const path = require("path");
const fs = require("fs");

const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: Storage });

const addProduct = async (req, res) => {
  try {
    const { productname, price, category, bestseller, description } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const restuarentId = req.params.restuarentId;
    const restuarent = await Restuarent.findById(restuarentId);

    if (!restuarent) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    const product = new Product({
      productname,
      price,
      category,
      bestseller,
      description,
      image,
      restuarent: restuarent._id,
    });

    const savedProduct = await product.save();

    restuarent.products.push(savedProduct._id);
    await restuarent.save();

    res.status(200).json({
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getProductByRest = async (req, res) => {
  try {
    const restuarentId = req.params.restuarentId;
    const restuarent = await Restuarent.findById(restuarentId);

    if (!restuarent) {
      return res.status(404).json({ error: "No restaurant found" });
    }
    const restuarentname = restuarent.restuarentname;
    const products = await Product.find({ restuarent: restuarentId });
    res.status(200).json({
      Name_of_restuarent: restuarentname,
      Available_items: products,
    });
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "no product found" });
    }
    res.status(200).json({
      message: "Product deleted successfully",
      product: deleteProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
module.exports = {
  addProduct: [upload.single("image"), addProduct],
  getProductByRest,
  deleteProduct,
};
