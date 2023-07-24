import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
const Signup = () => {
  const navigete = useNavigate();
  const [Form, setForm] = useState({});
  const [UserData, setUserData] = useState({});
  let handleChange = (e) => {
    // console.log(e.target.value);
    let value = e.target.value;
    let inputName = e.target.name;
    // console.log(inputName);
    setForm({ ...Form, [inputName]: value });
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    let responces = await axios.post("http://localhost:4002/api/users", Form);
    console.log(" responces = " + responces.data);
    const loginRes = await axios.post("http://localhost:4002/api/users/login", {
      email: Form.email,
      password: Form.password,
    });
    //
    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user,
    });
    //set localStorage with the token
    localStorage.setItem("auth-token", loginRes.data.token);
    navigete("/");
  };
  return (
    <div className="signupAll">
      <div className="signupDiv">
        {console.log(Form)}
        <div>Signup</div>
        <br />
        <form>
          <input
            required
            placeholder="first name"
            onChange={handleChange}
            name="firstName"
          />
          <br />
          <input
            required
            placeholder="Last name"
            onChange={handleChange}
            name="lastName"
          />
          <br />
          <input
            required
            placeholder="User name"
            onChange={handleChange}
            name="userName"
          />
          <br />
          <input
            required
            placeholder="Email "
            onChange={handleChange}
            name="email"
          />
          <br />
          <input
            required
            placeholder="Password "
            onChange={handleChange}
            name="password"
          />
          <br />
          <button type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
        </form>
        <br />
        <Link to="/login">Already have account</Link>
      </div>
    </div>
  );
};

export default Signup;
