import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home.jsx";
import DisplayItems from "./Component/Task1/DisplayCartItems/DisplaycartItems.jsx";
import Task1 from "./Component/Task1/Task1.jsx";
import SignUp from "./Component/Task2/Signup/Signup.jsx";
import Login from "./Component/Task2/Login/Login.jsx";
import Task3 from "./Component/Task3/Task3.jsx";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/task1" element={<Task1 />}></Route>
        <Route path="/task2" element={<SignUp />}></Route>
        <Route path="/shopList" element={<DisplayItems />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/task3" element={<Task3 />}></Route>
      </Routes>
    </div>
  );
}

export default App;
