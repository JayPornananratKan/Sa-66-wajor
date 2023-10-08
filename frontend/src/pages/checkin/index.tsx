import React from 'react';
import '../../App.css';
import './checkin.css';
import logo from "../../assets/logo.png"
import กู from "../../assets/กู.png"
import ก็กู from "../../assets/ก็กู.jpg"
import background from "../../assets/cin3.jpg"

function CheckIn() {
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

            {/* check start */}
            <section className="check">
                <div className="con">
                    <div className="title">
                        <h1>เช็คอิน</h1>
                    </div>
                        
                    <div className="check-con">
                         <div className="check-item">
                            <h1 >หมายเลขบัตรประชาชน</h1>
                            <input type="text" className="personalID" placeholder="กรอกหมายเลขบัตรประชาชน" />
                                
                            <h2 >รหัสการจอง</h2>
                            <input type="text" className="ticket" placeholder="กรอกรหัสการจอง" />
                        </div>    
                    </div>  
                </div>
            </section>

            <footer>
                
            </footer>

            {/* check end */}
        </div>
        
    );
}

export default CheckIn;
