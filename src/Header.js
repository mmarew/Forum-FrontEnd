import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
function Header() {
  useEffect(() => {
    let classes = document.getElementsByClassName("links");
    let i = 0;

    for (i = 0; i < classes.length; i++) {
      classes[i].addEventListener("click", (event) => {
        // console.log(classes);
        let j = 0;
        for (j = 0; j < classes.length; j++) {
          classes[j].classList.remove("activeNav");
          console.log(classes[j]);
        }
        event.target.className += " activeNav";
      });
    }
    // activeNav
  }, []);
  return (
    <div className="HeaderNav">
      <Link className="links" to="/">
        HOME
      </Link>
      <Link className="links" to="/howitwork">
        How it works
      </Link>
      <Link className="links" to="/login">
        Sign in
      </Link>
    </div>
  );
}

export default Header;
