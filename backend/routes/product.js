const express = require("express");
const router = express.Router();

//product's controller
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productsController.js");

const { authorizeRoles, isAuthenticatedUser } = require("../middlewares/auth");

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/review").post(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(isAuthenticatedUser, getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

router.route("");

module.exports = router;
