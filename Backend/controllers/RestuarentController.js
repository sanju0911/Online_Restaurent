const Restuarent = require("../models/Restuarent");
const Owner = require("../models/Owner");
const multer = require("multer");

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

    const OwnerID = await Owner.findById(req.OwnerID);

    if (!OwnerID) {
      return res.status(404).json({ error: "owner not found" });
    }
    const newRestuarent = new Restuarent({
      restuarentname,
      area,
      region,
      category,
      offer,
      image,
      Owner: OwnerID,
    });

    await newRestuarent.save();

    return res.status(200).json({ message: "restuarent added succesfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  AddRestuarent: [uploads.single("image"), AddRestuarent],
};
