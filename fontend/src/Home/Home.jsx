import React from "react";
import "./Home.css";
import Navbar from "../Component/Navbar/Navbar.jsx";

const Home = () => {
  return (
    <div className="m-container">
      <Navbar />
      <div className="home-container">
        <h1 className="home-heading">Welcome to the Task Dashboard</h1>
        <p className="home-paragraph">Select a task to view</p>
      </div>
    </div>
  );
};

export default Home;
