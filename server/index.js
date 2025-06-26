const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./src/config/db");
const authRoutes = require("./src/routes/auth");
const truckRoutes = require("./src/routes/trucks");
const bodyParser=require("body-parser")



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))



connectDb();

app.use('/auth', authRoutes);
app.use('/trucks', truckRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));