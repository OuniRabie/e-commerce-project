const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "../.env" });

// console.log("Current directory:", process.cwd());
// console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Basic route
app.get("/", (req, res) => {
  res.send("E-commerce API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//ounitestrabie
//falfoul2025iset
//mongodb+srv://ounitestrabie:<db_password>@cluster0.0zzqv.mongodb.net/
