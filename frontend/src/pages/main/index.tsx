// import { Link } from "react-router-dom";
import '../css/main.css';


import { ShowtimeInterface } from "../interface/Ishowtime";
// import { GetAllShowtime } from "../service";
// import { GetShowtimeByID } from "../service";





const Main = () => {
    return (
        <>
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          
           
          
          <div className='nav'>
          <img src="image/logo3.png"/>
            <a className='SelectMovie'>เลือกรอบภาพยนตร์</a>
            {/* <Link to="/seat" className='SelectMovie'>เลือกที่นั่ง</Link> */}
            <a className='SelectMovie'> เลือกที่นั่ง</a>
            <a className='SelectMovie'>ซื้อตั๋ว</a>
            <div className='profile'>
              <div>
                <h3>Jett</h3>
                <h3>Dualist</h3>
              </div>
              <img src="image/image 2.png"/>

            </div>
          </div>
          <div className='movielist'>
            <div className='movie'> 
              <div className='moviename'>
                <h2 className='name'>ชื่อภาพยนตร์</h2>
                <h3 className='name'>ความยาว</h3>
                <h3 className='name'>วันที่ฉาย</h3> </div>
              <div className='theatre'><h3>Theatre</h3> <h3>2D</h3>  </div>
              <div className='time'> 
                <a  className='t'>12:30</a>
                <a className='t'>14:30</a>
                <a className='t'>20:00</a>
              </div>
            </div>
            <div className='movie'> 
              <div className='moviename'>
                <h2 className='name'>ชื่อภาพยนตร์</h2>
                <h3 className='name'>ความยาว</h3>
                <h3 className='name'>วันที่ฉาย</h3> </div>
              <div className='theatre'><h3>Theatre</h3> <h3>2D</h3></div>
              <div className='time'> 
                <a className='t'>12:30</a>
                <a className='t'>14:30</a>
                <a className='t'>20:00</a>
              </div>
            </div>
            
            
          </div>
  
        </header>
      </div>
      </>
    );
  }
  export default Main;