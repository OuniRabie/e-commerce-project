const express = require("express");
const productController = require("../controllers/productController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Add a new product (Admin only)
router.post("/products", verifyToken, isAdmin, productController.addProduct);

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

module.exports = router;
