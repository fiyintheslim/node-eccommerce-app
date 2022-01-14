import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const Search = () => {
  const nav = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      nav(`/search/${keyword}`);
    } else {
      nav("/search");
    }
  };
  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <Outlet />
    </form>
  );
};

export default Search;
