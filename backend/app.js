const express = require("express");
const errorMiddleware = require("./middlewares/errors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
//importing all the routes
const products = require("./routes/product.js");
const auth = require("./routes/auth");

app.use("/api/v1", products);
app.use("/api/v1", auth);

//middleware to handle errors
app.use(errorMiddleware);

module.exports = app;