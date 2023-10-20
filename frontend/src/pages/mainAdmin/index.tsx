import { Link, useNavigate } from "react-router-dom";
import './mainAdmin.css';
import background from "../../assets/cin3.jpg"
import { ShowtimeInterface } from "../interface/Ishowtime";
import { GetAllShowtime } from "../service/httpClientService";
import { GetShowtimeByID } from "../service/httpClientService";
import { MembersInterface } from '../interface/Imember';
import { useEffect, useState } from 'react';
import { GetMemberByID } from '../service/httpClientService';
import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { CreateBooking } from "../service/httpClientService";
import { BookingInterface } from "../interface/Ibooking";
import { SeatInterface } from "../interface/Iseat";
import Navbar from "../../Navbar/navbar";
import {GetMovie} from "../service/httpClientService";
import { movieInterface } from "../interface/Imovie";
import NavbarUser from "../../Navbar/navbarUser";
interface MainProps{
  setData: React.Dispatch<React.SetStateAction<BookingInterface | undefined>>
}

const MainAdmin = ({setData}:MainProps) => {
  const [message, setAlertMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [booking, setBooking] = React.useState<BookingInterface>({} as BookingInterface);
  const [show, setShowtime] = useState<ShowtimeInterface[]>([]);
  const [member, setMember] = useState<MembersInterface>();
  const [showtimes, setShowtimes] = useState([]); // State เก็บข้อมูลเวลาที่ฉาย
  const [movies, setMovie] = useState<movieInterface[]>([]);
  const [selectedShowtime, setSelectedShowtime] = useState<number | null>(null); // กำหนด selectedShowtime ให้รองรับค่าเป็นตัวเลขหรือ null
  const [seat, setSeat] = useState<SeatInterface[]>([]);
  const navigate = useNavigate()
  const getAllShowtime = async () => {
    let res = await GetAllShowtime();
    if (res) {
      setShowtime(res);
    }
  };
  const getMovie = async () => {
    let res = await GetMovie();
    if (res) {
      setMovie(res);
      console.log(movies)
    }
  };
  const getMemberByID = async () => {
    let res = await GetMemberByID();  
    if (res) {
      setMember(res[0]);
      console.log("เวลาที่ฉาย:", res);
    }
  };
  const getShowtimeByID = async () => {
    let res = await GetShowtimeByID();  
    if (res) {
      setShowtime(res[0]);
    }
  };
  useEffect(() => {
    getMovie();
    getAllShowtime();
    getMemberByID();
  }, []);
  // async function submit() {
    
  //   let res = await CreateBooking(booking);
  //   console.log(res)

    
  // }

  const [selectedSeats, selectedShowtimes] = useState<string[]>([]);
  // const handleShowtimeSelection = (showtimeID: string) => {
  //   // โค้ดในฟังก์ชัน handleSeatSelection
  //   if (selectedShowtimes.includes(showtimeID)) {
  //     setselectedShowtimes(selectedShowtimes.filter((show) => show !== showtimeID));
  //   } else {
  //     setselectedShowtimes([...selectedSeats, showtimeID]);
  //   }
  // };
  const handleShowtimeSelection = (showtimeID:number) => {
    const data:BookingInterface={
      MemberID:member?.ID!,
      ShowtimeID:showtimeID!,
      SeatID:0
    }
    setData(data)
    navigate("/seat")
    //setSelectedShowtime(showtimeID);
  };
  const handleSeatSelection = () => {
    if (selectedShowtime) {
      // history.push(`/Seat?showtime=${selectedShowtime.id}`);
      // ทำการนำข้อมูลเวลาที่ฉายและส่งไปยังหน้าถัดไป
      
    } else {
      // แจ้งเตือนให้เลือกเวลาที่ฉาย
      alert("โปรดเลือกเวลาที่ฉาย");
    }
  };

  function OnSelectShowtime(showtimeID:number | undefined,e:React.ChangeEvent<HTMLInputElement>) {
    if(e.currentTarget.checked){
      const data:BookingInterface={
        MemberID:member?.ID!,
        ShowtimeID:showtimeID!,
        SeatID:30
      }
      setBooking(data)
      console.log(data)
    }else{
      const data:BookingInterface={
        MemberID:0,
        ShowtimeID:0,
        SeatID:0
      }
      setBooking(data)
      console.log(data)
    }
    
  }
    return (
        <>
      <div className="App">
      <Snackbar
            id="success"
            open={success}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert  severity="success">
              {message}
            </Alert>
          </Snackbar>

          <Snackbar
            id="error"
            open={error}
            autoHideDuration={6000}
          >
            <Alert  severity="error">
              {message}
            </Alert>
          </Snackbar>
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          
         <nav>
            <Navbar />
         </nav>

         <section className="background">
          <li><img src={background} alt="" /></li>
          </section>
          <div className='movielist'>
            <div className='movie'> 
              <div className="moviepic">
              
              </div>
              <div className='moviename'>
               
                  {movies.map((movie) => (<h2 key={movie.ID} className="name">ชื่อภาพยนตร์ {`${movie.Name}`}</h2>))} 
                  {movies.map((movie) =>(<h3 className='name'>ความยาว{`${movie.Length}`}นาที</h3>))}
                  {movies.map((movie) =>(<h3 className='name'>วันที่ฉาย{`${movie.Release}`}</h3>))}
                 </div>
              <div className='theatre'><h3>Theatre1</h3> <h3>2D</h3>  </div>
              <div className='time'> 
                {/* <a  className='t'>12:30</a>
                <a className='t'>14:30</a>
                <a className='t'>20:00</a> */}
                {show.map((showtime) => (
              <a
              key={showtime.ID}
              className={`t ${selectedShowtime === showtime.ID ? 'selected' : ''}`}
              onClick={() => handleShowtimeSelection(showtime.ID!)}
              >
               {`${showtime.Datie}`}
              </a>))}
            {/* //   showtime.ID === 1 ? (// เช็คว่า ID ของรอบเท่ากับ 1 หรือรอบที่คุณต้องการ
            //   <a
            //     key={showtime.ID}
            //     className={`t ${selectedShowtime === showtime.ID ? 'selected' : ''}`}
            //     onClick={() => handleShowtimeSelection(showtime.ID!)}
            //   >
            //     12:30 ${getShowtimeByID}
            //   </a>): null)
            //  // หากไม่ใช่รอบที่คุณต้องการจะไม่แสดงอะไรเลย */}
          
            </div>
            </div>
            {/* <div className='movie'> 
              <div className='moviename'>
                <h2 className='name'>ชื่อภาพยนตร์ </h2>
                <h3 className='name'>ความยาว</h3>
                <h3 className='name'>วันที่ฉาย</h3> </div>
              <div className='theatre'><h3>Theatre</h3> <h3>2D</h3></div>
              <div className='time'> 
              {show.map((showtime) => (
              <a
              key={showtime.ID}
              className={`p ${selectedShowtime === showtime.ID ? 'selected' : ''}`}
              onClick={() => handleShowtimeSelection(showtime.ID!)}
              >
               {`${showtime.Datie}`}
              </a>))} */}
                {/* <a className='t'>12:30</a>
                <a className='t'>14:30</a>
                <a className='t'>20:00</a>
                 */}
             
              {/* </div>
            </div> */}
            
            
          </div>
  
        </header>
        </div>
      
      
      </>
    
    );
  }
  export default MainAdmin;