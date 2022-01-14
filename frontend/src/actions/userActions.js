import { useDispatch } from "react-redux";
import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
} from "../constants/userConstants";

export const login = async (dispatch, email, password) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const login = await axios.post(
      "/api/v1/login",
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: login.data.user });
  } catch (err) {
    console.log("err", err.response);
    dispatch({ type: LOGIN_FAIL, payload: err.response.data.errMessage });
  }
};

//Clear errors
export const clearErrors = async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

//register users
export const register = async (dispatch, user) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const login = await axios.post("/api/v1/register", user, config);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: login.data.user });
  } catch (err) {
    console.log("err", err.response);
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: err.response.data.errMessage,
    });
  }
};
