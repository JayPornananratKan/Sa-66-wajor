import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./navbarUser.css";
import กู from "../assets/กู.png"

function NavbarUser() {
  return (
    <nav>
      <div className="logo">
        <a href="/"><img src={logo} alt="" /></a>
      </div>

      <ul className="menu">
        <li><a href="/mainUser">ภาพยนตร์</a></li>
        <li><a href="/seat">จองตั๋ว</a></li>
        <li></li>
        <li></li>
      </ul>

      <div className="profile">
        <div className="name">
          <a>Hi, Member</a>
        </div>

        <div className="logo2">
        <a href="/"><img src={กู} alt="" /></a>
        </div>
      </div>
    </nav>
  );
}

export default NavbarUser;