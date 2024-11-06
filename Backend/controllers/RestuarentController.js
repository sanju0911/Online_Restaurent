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
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const uploads = multer({ storage: Storage });

const AddRestuarent = async (req, res) => {
  try {
    const { restuarentname, area, region, category, offer } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const owner = await Owner.findById(req.OwnerID);

    if (!owner) {
      return res.status(404).json({ error: "Owner not found" });
    }

    const newRestuarent = new Restuarent({
      restuarentname,
      area,
      region: Array.isArray(region) ? region : [region],
      category: Array.isArray(category) ? category : [category],
      offer,
      image,
      Owner: req.OwnerID,
    });

    const savedRestuarent = await newRestuarent.save();

    owner.restuarent.push(savedRestuarent._id);

    await owner.save();

    return res.status(200).json({ message: "Restaurant added successfully" });
  } catch (error) {
    console.log("Error adding restaurant:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  AddRestuarent: [uploads.single("image"), AddRestuarent],
};
