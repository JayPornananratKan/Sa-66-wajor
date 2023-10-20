import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./navbarLogin.css";
import กู from "../assets/กู.png"

function NavbarLogin() {
  return (
    <nav>
      <div className="logo">
          <a href="/"><img src={logo} alt="" /></a>
      </div>

      <ul className="menu">
      <a>Welcome To Wajor Cineplex</a>

      </ul>

        <div className="profile">
          <div className="name">
            <a>Hi, User</a>
          </div>

          <div className="logo2">
            <a href="/"><img src={กู} alt="" /></a>
          </div>
        </div>
    </nav>
  );
}

export default NavbarLogin;