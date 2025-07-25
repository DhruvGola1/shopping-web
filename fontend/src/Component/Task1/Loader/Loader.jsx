import React from "react";
import "./Loader.css";

// re-usable Component
const Loader = () => {
  return (
    <div className="loader-container">
      <span className="loading-icon">
        <i className="fa-solid fa-spinner icons"></i>
      </span>{" "}
      <p className="loading-text">Loader...</p>
    </div>
  );
};

export default Loader;
