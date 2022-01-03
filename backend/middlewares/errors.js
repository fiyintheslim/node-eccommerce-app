const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server error";
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMerssage: err.message,
      stack: err.stack,
    });
  }
  if (process.env.NODE_ENV === "PRODUCTION") {
    res.status(err.statusCode).json({
      success: false,
      message: err.message || "INTERNAL SERVER ERROR",
    });
  }
  // res.status(err.statusCode).json({
  //   success: false,
  //   error: err.stack,
  // });
};
