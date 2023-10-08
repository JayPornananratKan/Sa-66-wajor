import React from 'react';
import '../../App.css';
import logo from "../../assets/logo.png"
import กู from "../../assets/กู.png"
import background from "../../assets/cin3.jpg"


function ManageShow() {
    return (
        <div className="App">
            {/* Nav Start */}
            <nav>
                <div className="logo">
                    <a href="/"><img src={logo} alt="" /></a>
                </div>

                <ul className="menu">
                    <li><a href="/">หน้าหลัก</a></li>
                    <li><a href="/manageInfo">จัดการข้อมูล</a></li>
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
            {/*  nav end */}

            <section className="background">
                <li><img src={background} alt="" /></li>
            </section>

            <section className="check">
                <div className="con">
                    <div className="title">
                        <h1></h1>
                    </div>
                        
                    <div className="check-con">
                         
                    </div>  
                </div>
            </section>
            {/* adverse start */}
            <section className="manageShow">

            </section>
            {/* adverse end */}
        </div>
        
    );
}

export default ManageShow;
