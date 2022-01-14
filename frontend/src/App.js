import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

import "./App.css";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container container-fluid">
        <Home />
      </div>
      <Footer />
    </div>
  );
}

export default App;
