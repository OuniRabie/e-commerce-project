const multer = require("multer");
const path = require("path");

// Set up storage engine for multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// Store files in memory
const storage = multer.memoryStorage();

// Initialize upload variable
const upload = multer({ storage });

module.exports = upload;
