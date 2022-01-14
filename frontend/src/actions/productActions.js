import axios from "axios";
import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const getProducts = async (
  dispatch,
  page = 1,
  keyword = "",
  price,
  cat
) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });
    let link = `/api/v1/products?page=${page}&keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
    if (cat) {
      link = `/api/v1/products?page=${page}&keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${cat}`;
    }
    console.log("link", link);
    const { data } = await axios.get(link);

    dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get product Details
export const getProductDetails = async (dispatch, id) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clear errors
export const clearErrors = async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
