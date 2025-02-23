const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");

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

// Use user routes
app.use("/api/users", userRoutes);
// Route to serve the reset password page
app.get("/reset-password/:token", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/reset-password.html"));
});
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
