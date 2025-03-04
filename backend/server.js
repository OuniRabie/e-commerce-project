const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productsRoutes");

dotenv.config({ path: "../.env" });

// console.log("Current directory:", process.cwd());
// console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
// Serve static files (frontend)
app.use(express.static(path.join(__dirname, "../frontend")));

// Serve static files (uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route to serve the reset password page
app.get("/reset-password/:token", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/reset-password.html"));
});
app.get("/products", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/products.html"));
});
// Serve the "Add Product" page
app.get("/add-product", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/add-product.html"));
});
// Use user routes
app.use("/api/users", userRoutes);
// Use product routes
app.use("/api", productRoutes);
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
