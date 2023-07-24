import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);
  const [Form, setForm] = useState({});
  const submitLoginForm = async (e) => {
    e.preventDefault();
    // alert("submit");
    try {
      const loginRes = await axios.post(
        "http://localhost:4002/api/users/login",
        Form
      );
      console.log(loginRes.data);
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      //navigate user to homepage
      navigate("/");
    } catch (error) {}
  };
  let handleChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
    setForm({ ...Form, [e.target.name]: e.target.value });
  };
  return (
    <div className="loginAll">
      <div className="loginParentDiv">
        <div className="loginDiv">
          <form className="loginForm" onSubmit={submitLoginForm}>
            <input
              onChange={handleChange}
              name="email"
              placeholder="Email"
              type="text"
            />
            <br />
            <input
              onChange={handleChange}
              name="password"
              placeholder="Password"
              type="text"
            />
            <br />
            <button type="submit">Submit</button>
          </form>
          <Link className="signUp" to="/signup">
            Sign up
          </Link>
        </div>
        <div className="info login">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae beatae
          nam deserunt quos facilis fuga laborum, exercitationem impedit modi!
          Rem pariatur nobis nam sit aut cupiditate officiis corrupti eaque
          natus.
        </div>
      </div>
    </div>
  );
}
export default Login;
