const catchAsyncErrors = require("./catchAsyncErrors");
const errorHandler = require("../utils/errorHandler");
const user = require("../models/user");
const jwt = require("jsonwebtoken");

//Checks if user is authenticated
exports.isAuthenticatedUser = catchAsyncErrors(async function (req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return next(new errorHandler("Login first to access this resource.", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await user.findById(decoded.id);

  next();
});

//handles roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new errorHandler(
          `Role ${req.user.role} is not allowed to access this resource`
        )
      );
    }
    next();
  };
};
