const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const fontRoute = require("./routes/fontRoutes");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/fonts", fontRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
