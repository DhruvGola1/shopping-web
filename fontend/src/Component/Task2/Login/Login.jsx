import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [inputData, setinputData] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");

  const handelchange = (e) => {
    setinputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const resutLogin = await axios.post(
        "http://localhost:3000/user/login",
        inputData
      );
      await localStorage.setItem("token", resutLogin.data.token);

      //   console.log("login", resutLogin);
      setMsg(resutLogin.data.message);
      if (resutLogin.data.status === "success") {
        setinputData({ email: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {" "}
      <div className="login-form">
        <form className="form-container">
          <div className="col-md-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              name="email"
              onChange={handelchange}
              value={inputData.email}
            />
          </div>
          <div className="col-md-12">
            <label for="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              name="password"
              onChange={handelchange}
              value={inputData.password}
            />
          </div>
          <div className=" btns">
            <Link
              type="submit"
              className="btn btn-primary sumbtn"
              onClick={(e) => {
                e.preventDefault();
                handleSubmitForm(e);
              }}
            >
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary sumbtn">
              Back to Signup
            </Link>
          </div>
          <p>{msg}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
