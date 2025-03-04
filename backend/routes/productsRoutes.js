const express = require("express");
const productController = require("../controllers/productController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const cloudinary = require("../utils/cloudinaryConfig");
const upload = require("../utils/multerConfig");
const Product = require("../models/Product");

const router = express.Router();

// Add a new product (Admin only)

// Add a new product with image upload to Cloudinary
// Add a new product with image upload to Cloudinary (Admin only)
router.post(
  "/products",
  verifyToken,
  isAdmin,
  upload.single("image"), // Expects a field named 'image'
  async (req, res) => {
    const { name, category, price, description, stock, color } = req.body;

    try {
      // Upload image to Cloudinary directly from memory
      const result = await cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
          },
          async (error, result) => {
            if (error) {
              console.error("Error uploading image:", error);
              return res.status(500).json({ message: "Error uploading image" });
            }

            // Create product with Cloudinary image URL
            const product = new Product({
              name,
              category,
              price,
              description,
              images: [result.secure_url],
              stock,
              color,
            });

            await product.save();
            res
              .status(201)
              .json({ message: "Product added successfully", product });
          }
        )
        .end(req.file.buffer);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);
// Update a product (Admin only)
router.put(
  "/products/:id",
  verifyToken,
  isAdmin,
  productController.updateProduct
);

// Delete a product (Admin only)
router.delete(
  "/products/:id",
  verifyToken,
  isAdmin,
  productController.deleteProduct
);

// Get all products
router.get("/products", productController.getAllProducts);

// Get products by category
router.get(
  "/products/category/:category",
  productController.getProductsByCategory
);
// Get product details by ID
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
