const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const OwnerRoutes = require("./routes/OwnerRoutes");
const RestuarentRoutes = require("./routes/Restuarentroutes");
const ProductRoutes = require("./routes/ProductsRoutes");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("error with connection");
  });

app.use("/Owner", OwnerRoutes);
app.use("/Restuarent", RestuarentRoutes);
app.use("/Products", ProductRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("<h1>WELCOME TO ONLINE_RESTUARENT</h1>");
});

app.listen(port, () => {
  console.log("server is running on port 3000");
});
