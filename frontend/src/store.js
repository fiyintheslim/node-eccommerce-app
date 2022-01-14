import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducers,
  productdetailsReducer,
} from "./reducers/productReducer";
import { authReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  products: productReducers,
  productDetails: productdetailsReducer,
  auth: authReducer,
});

const initialState = {};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
