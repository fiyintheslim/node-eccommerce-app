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
    productsCount: products.length,
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
//Create new product review => /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

  const {rating, comment, productId} = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name, 
    rating: Number(rating),
    comment 
  }

  const product = await Product.findById(productId);

  if(!product){
    return next(new ErrorHandler('Product not found', 404))
  }
  const isReviewed = product.reviews.find(r=>{
    return r.user.toString() === req.user._id.toString()
  })

  if(isReviewed){

    product.reviews.forEach(r=>{
      if(r.user.toString() === req.user._id.toString()){
        r.comment = comment;
        r.rating = Number(rating)
      }
    })
  }else{

    product.reviews.push(review);
    product.numOfReviews = product.reviews.length
    
  }

  product.ratings = product.reviews.reduce((acc, i)=>acc + i.ratings, 0) / product.reviews.length

  await product.save({validateBeforeSave:false});

  res.status(200).json({success:true})
})
//Get all product reviews => /api/v1/reviews/:id
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if(!product){
    return next(new ErrorHandler('Product not found.', 404))
  }

  return res.status(200).json({
    success:true,
    reviews:product.reviews
  })
})

//Delete product review => /api/v1/reviews/:id
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if(!product){
    return next(new ErrorHandler('Product not found.', 404))
  }

  const reviews = product.reviews.filter(r => r._id.toString() !== req.query.id.toString());
  const ratings = reviews.length > 0 ? product.reviews.reduce((acc, i)=>{return acc + i.ratings}, 0) / reviews.length : 0;
  const numOfReviews = product.reviews.length
  console.log(reviews, ratings, numOfReviews)
  
  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    ratings,
    numOfReviews
  },{
    new:true,
    runValidators: true,
    useFindAndModify: false,
  })


  return res.status(200).json({
    success:true
  })
})
