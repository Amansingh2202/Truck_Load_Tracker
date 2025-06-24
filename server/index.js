// server/index.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDb = require("./src/config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDb();

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
