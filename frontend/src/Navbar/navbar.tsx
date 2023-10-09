import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./navbar.css";
import กู from "../assets/กู.png"

function Navbar() {
  return (
    <nav>
      <div className="logo">
                    <a href="/"><img src={logo} alt="" /></a>
                </div>

                <ul className="menu">
                    <li><a href="/">หน้าหลัก</a></li>
                    <li><a href="/modify">จัดการข้อมูล</a></li>
                    <li><a href="/manageShow">จัดการรอบฉาย</a></li>
                    <li><a href="/checkIn">เช็คอิน</a></li>

                </ul>

                <div className="profile">
                    <div className="name">
                        <a>Hi, NuiGuide</a>
                    </div>

                    <div className="logo2">
                        <a href="/login"><img src={กู} alt="" /></a>
                    </div>
                </div>
    </nav>
  );
}

export default Navbar;