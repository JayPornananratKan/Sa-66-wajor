import React from 'react';
import '../../App.css';
import logo from "../../assets/logo.png"
import กู from "../../assets/กู.png"
import ManageInfo from '../moviesin';
import { useNavigate } from 'react-router-dom';
import ก็กู from "../../assets/ก็กู.jpg"
import background from "../../assets/cin3.jpg"


const Main = () => {

    return (
        <div className="App">
        {/* Nav Start */}
        <nav>
            <div className="logo">
                <img src={logo} alt="" />
            </div>

            <ul className="menu">
                <li><a href="/">หน้าหลัก</a></li>
                <li><a href="/manageInfo">จัดการข้อมูล</a></li>
                <li><a href="/manageShow">จัดการรอบฉาย</a></li>
                <li><a href="/checkIn">เช็คอิน</a></li>

            </ul>

            <div className="profile">
                <div className="name">
                    <a>Hi, mumumimi</a>
                </div>

                <div className="logo2">
                    <a href="/login"><img src={กู} alt="" /></a>                
                </div>
            </div>

        </nav>
        {/*  nav end */}

        


        <section className="background">
                <li><img src={background} alt="" /></li>
        </section>

        <section className="main">
            <h1>เฮลโล่ สีเหลือง</h1>
            <h2>I Guide Na Hee</h2>
            <h3>How to be Guide's Girlfriend</h3>
        </section>
        

        {/* adverse start */}
        
        {/* adverse end */}

        
    </div>
        
    );
}

export default Main;
