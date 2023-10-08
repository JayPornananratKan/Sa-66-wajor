import React from 'react';
import '../../App.css';
import './login.css';
import logo from "../../assets/logo.png"
import กู from "../../assets/กู.png"
import background from "../../assets/cin3.jpg"

const Login = () => {

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
                    <a href="/login"><img src={กู} alt="" /></a>                </div>
            </div>

        </nav>
        {/*  nav end */}

        <section className="log-background">
                <li><img src={background} alt="" /></li>
        </section>

        <div className="blog">
            <section className="login">
                <h1>Login</h1>
            </section>

            <section className="login-container">
                <div className="login-item">
                    <div className="username">
                        <h1 >Username : </h1>
                        <input type="text" className="username_input" placeholder="Username" />
                    </div>
                    
                    <div className="password">
                        <h2 >Password : </h2>
                        <input type="text" className="password_input" placeholder="Password" />
                    </div>    

                    <div className="butt">
                        <li><a className= "register_butt"href="/">Register</a></li>
                        <li ><a className= "login_butt" href="https://www.youtube.com/watch?v=bO-7renGFfw&ab_channel=SAMARNOfficial">Login</a></li>
                    </div>

                    <div className="forgot">
                        <li><a href="/">Forgot Password?</a></li>
                    </div>
                    
                      
                </div>

                
            </section>
        </div>
        


    </div>
        
    );
}

export default Login;
