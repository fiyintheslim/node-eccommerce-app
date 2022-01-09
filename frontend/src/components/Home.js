import React, { useEffect } from "react";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Product from "./products/product";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";

import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();
  const { productsCount, products, error, loading } = useSelector(
    (state) => state.products
  );
  const alert = useAlert();
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    getProducts(dispatch);
  }, [dispatch, error]);

  return (
    <>
      <MetaData title={"Buy Best Products Online"} />
      <h1 id="products_heading">Latest Products</h1>
      {loading ? (
        <Loader />
      ) : (
        <section id="products" className="container mt-5">
          <div className="row">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </section>
      )}
    </>
  );
};
export default Home;
