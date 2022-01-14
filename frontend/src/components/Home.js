import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import { useParams, useLocation } from "react-router-dom";
import Slider from "rc-slider";
import MetaData from "./layouts/MetaData";
import Product from "./products/product";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";

import { useAlert } from "react-alert";
import "rc-slider/assets/index.css";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const categories = [
    "Electronics",
    "Cameras",
    "Laptop",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Cloths/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdooor",
    "Home",
  ];
  const path = useLocation();

  const params = useParams();
  const dispatch = useDispatch();
  const {
    productsCount,
    products,
    error,
    loading,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 10000]);
  const [category, setCategory] = useState();

  let search = path.pathname.match(/search/);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    getProducts(dispatch, currentPage, params.keyword, price, category);
  }, [dispatch, error, currentPage, alert, params, price, category]);

  function setCurrentPageNo(pageNo) {
    return setCurrentPage(pageNo);
  }
  let count = productsCount;
  if (search) {
    count = filteredProductsCount;
  }
  return (
    <>
      <MetaData title={"Buy Best Products Online"} />
      <h1 id="products_heading">Latest Products</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <section id="products" className="container mt-5">
            <div className="row">
              {search && (
                <>
                  <div className="col-6 col-md-3 mt-5 mb-6">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: "$1",
                          1000: "$1000",
                        }}
                        min={1}
                        max={1000}
                        defauleValue={[1, 1000]}
                        tipFormatter={(value) => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                      <hr className="my-5" />

                      <div className="mt-5">
                        <h4 className="mb-3">Categories</h4>
                        <ul className="pl-0">
                          {categories.map((cat, i) => {
                            return (
                              <li
                                style={{ cursor: "pointer", listStyle: "none" }}
                                key={i}
                                onClick={() => setCategory(cat)}
                              >
                                {cat}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products.map((product) => (
                        <Product key={product._id} product={product} col={4} />
                      ))}
                    </div>
                  </div>
                </>
              )}
              {products &&
                !search &&
                products.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))}
            </div>
          </section>
          {resPerPage < count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                lastPageText={"Last"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                itemClass={"page-item"}
                linkClass={"page-link"}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
export default Home;
