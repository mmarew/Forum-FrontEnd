import axios from "axios";
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./UserContext";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./Signup";
import Header from "./Header";
function App() {
  const [userData, setUserData] = useContext(UserContext);
  const checkLoggedIn = async () => {
    //check if token already exists in localStorage
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      //token not in localStorage then set auth token empty
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      //if token exists in localStorage then use auth to verify token and get user info
      const userRes = await axios.get("http://localhost:4002/api/users", {
        headers: { "x-auth-token": token },
        Token: token,
      });

      //set the global state with user info
      setUserData({
        token,
        user: {
          id: userRes.data.data.user_id,
          display_name: userRes.data.data.user_name,
        },
      });
    }
  };
  const logout = () => {
    //set global state to undefined will logout the user
    setUserData({
      token: undefined,
      user: undefined,
    });
    //resetting localStorage
    localStorage.setItem("auth-token", "");
  };
  useEffect(() => {
    //check if the user is logged in
    checkLoggedIn();
  }, []);
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                <Header />
                <SignUp />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Header />
                <Login />
              </>
            }
          />
          {/* passing logout function as props to Home page */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home logout={logout} />
              </>
            }
          />
          <Route
            path="/howitwork"
            element={
              <>
                <Header />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
