const fs = require("fs");
const path = require("path");
const Restuarent = require("../models/Restuarent");
const Owner = require("../models/Owner");
const multer = require("multer");

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

const uploads = multer({ storage: Storage });

const AddRestuarent = async (req, res) => {
  try {
    const { restuarentname, area, category, region, offer } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const owner = await Owner.findById(req.OwnerID);

    if (!owner) {
      return res.status(404).json({ error: "Owner not found" });
    }

    const newRestaurant = new Restuarent({
      restuarentname,
      area,
      category: Array.isArray(category) ? category : [category],
      region: Array.isArray(region) ? region : [region],
      offer,
      image,
      Owner: req.OwnerID,
    });

    const savedRestaurant = await newRestaurant.save();

    owner.restuarent.push(savedRestaurant._id);

    await owner.save();

    return res.status(200).json({ message: "Restaurant added successfully" });
  } catch (error) {
    console.log("Error adding restaurant:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteResturarent = async (req, res) => {
  try {
    const restId = req.params.RestuarentId;

    const deletedResturarent = await Restuarent.findByIdAndDelete(restId);

    if (!deletedResturarent) {
      return res.status(404).json({ error: "no restuarent found" });
    }
    return res.status(200).json({ message: "restuarent deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "internal srver error" });
  }
};

module.exports = {
  AddRestuarent: [uploads.single("image"), AddRestuarent],
  deleteResturarent,
};
