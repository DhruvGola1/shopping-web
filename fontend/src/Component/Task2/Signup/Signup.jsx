import axios from "axios";
import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";

const SignUp = () => {
  const [validText1, setValidText1] = useState(true);
  const [validText2, setValidText2] = useState(true);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const changeValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
  };
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName) {
      setValidText1(false);
      return;
    } else if (!formData.lastName) {
      setValidText1(true);
      setValidText2(false);
      return;
    }
    if (!formData.email.endsWith("@gmail.com")) {
      setValidText2(true);
      alert("Enter Valid Gmail");
      return;
    }
    if (!strongPasswordRegex.test(formData.password)) {
      alert("Enter Valid Passwrod");
      return;
    }
    const sendData = await axios.post(
      "http://localhost:3000/user/sign",
      formData
    );
    setMessage(sendData.data.message);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="colss">
          <div className="empty-sing">
            <i className="fa-solid fa-user-secret user-icons"></i>
          </div>
          <form className="form-floating form-items">
            <div className="login-text">
              <div className="col">
                <label for="exampleInputPassword1" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className={`form-control ${validText1 ? "" : "lable-red"}`}
                  placeholder="First name"
                  aria-label="First name"
                  value={formData.firstName}
                  name="firstName"
                  onChange={changeValue}
                />
              </div>
              <div className="col">
                <label for="exampleInputPassword1" className="form-label ">
                  Last Name
                </label>
                <input
                  type="text"
                  className={`form-control ${validText2 ? "" : "lable-red"}`}
                  placeholder="Last name"
                  aria-label="Last name"
                  value={formData.lastName}
                  name="lastName"
                  onChange={changeValue}
                />
              </div>
              <div className="mb-1">
                <label for="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={formData.email}
                  name="email"
                  onChange={changeValue}
                />
                {formData.email && !formData.email.endsWith("@gmail.com") && (
                  <small style={{ color: "red" }}>
                    Email must end with <strong>@gmail.com</strong>
                  </small>
                )}
              </div>
              <div className="mb-1">
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={formData.password}
                  name="password"
                  onChange={changeValue}
                />
                {formData.password &&
                  !strongPasswordRegex.test(formData.password) && (
                    <small style={{ color: "red" }}>
                      Password must be at least 8 characters, include uppercase,
                      lowercase, number, and special character (like @, #, !)
                    </small>
                  )}
              </div>
              <Link className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </Link>
              <Link to="/login" className="btn btn-primary">
                Back to Login
              </Link>
              <p>{message}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
