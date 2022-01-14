import React from "react";
import { Link, Outlet } from "react-router-dom";

const Product = ({ product, col }) => {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          src="https://m.media-amazon.com/images/I/617NtexaW2L._AC_UY218_.jpg"
          alt="sd card"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <a href="#">{product.name}</a>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div className="rating-inner"></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
          </div>
          <p className="card-text">${product.price}</p>
          <Link
            to={`/product/${product._id}`}
            id="view_btn"
            className="btn btn-block"
          >
            View Details
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Product;
