const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const OwnerRoutes = require("./routes/OwnerRoutes");
const bodyParser = require("body-parser");

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

app.listen(port, () => {
  console.log("server is running on port 3000");
});
