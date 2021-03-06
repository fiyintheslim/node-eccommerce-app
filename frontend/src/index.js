import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import App from "./App";
import ProductDetails from "./components/products/productDetails";
import Login from "./components/user/Login";

import { Provider } from "react-redux";
import store from "./store";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/search" element={<App />}>
              <Route path="/search/:keyword" element={<App />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </Router>
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
