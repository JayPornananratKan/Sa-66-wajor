import React from "react";
import { Link } from "react-router-dom";
import logo from "../asset/logo.png";
import "./navbar.css";

function Navbar() {
  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="" />
      </div>

      <ul className="menu">
        <li><a href="/">หน้าหลัก</a></li>
        <li><a href="/ManageInfo">จัดการข้อมูล</a></li>
        <li><a href="/ManageShow">จัดการรอบฉาย</a></li>
        <li><a href="/CheckIn">เช็คอิน</a></li>
      </ul>

      <div className="profile">
        <div className="name">
          <a>Hi, mumumimi</a>
        </div>

        <div className="logo2">

        </div>
      </div>
    </nav>
  );
}

export default Navbar;