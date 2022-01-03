const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//get all products
exports.getProducts = async (req, res, next) => {
  const productCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product, req.query)
    .search()
    .filter()
    .pagination(3);

  const products = await apiFeatures.query;
  // const products = await Product.find();
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};

//cretae new product => /api/v1/product/new
exports.newProduct = async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

//get single product => /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  return res.status(200).json({
    success: true,
    product,
  });
};

//update product => /api/v1/product/:id
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Couldn't find product",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return res.status(200).json({
    success: true,
    product,
  });
};
//delete product  => /api/v1/product/:id
exports.deleteProduct = async (req, res, next) => {
  let product = Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  await Product.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "Product sucessfully deleted",
  });
};
