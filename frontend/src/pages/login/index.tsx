import React from 'react';
import '../../App.css';
import './login.css';
import logo from "../../assets/logo.png"
import กู from "../../assets/กู.png"
import background from "../../assets/cin3.jpg"
import NavbarLogin from '../../Navbar/navbarLogin';

const Login = () => {

    return (
        <div className="App">
        {/* Nav Start */}
        <nav>
            <NavbarLogin />

        </nav>
        {/*  nav end */}

        <section className="background">
                <li><img src={background} alt="" /></li>
        </section>

        <div className="blog">
            <section className="login">
                <h1>Login</h1>
            </section>

            <section className="login-container">
                <div className="login-item">
                    {/* <div className="username">
                        <h1 >Username : </h1>
                        <input type="text" className="username_input" placeholder="Username" />
                    </div>
                    
                    <div className="password">
                        <h2 >Password : </h2>
                        <input type="text" className="password_input" placeholder="Password" />
                    </div>     */}

                    <div className="butt">
                        <li><a className= "member_butt"href="/mainUser">Member</a></li>
                        <li ><a className= "admin_butt" href="/mainAdmin">Admin</a></li>
                    </div>                      
                </div>

                
            </section>
        </div>
        


    </div>
        
    );
}

export default Login;
