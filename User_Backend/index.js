const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const db = require("./config/db");
const UserRoutes = require("./Routes/UserRoutes");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/User", UserRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
