import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import กู from '../../assets/กู.png';
import background from '../../assets/cin3.jpg';
import { Link } from "react-router-dom";
import '../../App.css';
import './seat.css';


import { SeatInterface } from "../interface/Iseat";
import { TypeSeatInterface } from "../interface/Itypeseat";
import { GetAllSeat } from "../service/httpClientService";
import { GetSeatByID } from "../service/httpClientService";
import { CreateBooking } from "../service/httpClientService";
import { BookingInterface } from "../interface/Ibooking";
import { Alert, Snackbar } from '@mui/material';
import { MembersInterface } from '../interface/Imember';
import { GetMemberByID } from '../service/httpClientService';
import NavbarUser from '../../Navbar/navbarUser';
import { useLocation } from "react-router-dom";
interface MainProps{
  Bookdata: BookingInterface | undefined
  setData: React.Dispatch<React.SetStateAction<BookingInterface | undefined>>
}
const SeatComp = ({setData,Bookdata}:MainProps) => {
  // const [seat, setSeat] = React.useState<Partial<SeatInterface>>({});
  const [seat, setSeat] = useState<SeatInterface[]>([]);
  const [member, setMember] = useState<MembersInterface>();
  const [Typeseat, setTypeseat] = React.useState<Partial<TypeSeatInterface>>({});
  const [booking, setBooking] = React.useState<BookingInterface>({} as BookingInterface);
  const [message, setAlertMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const getAllSeat = async () => {
    let res = await GetAllSeat();
    if (res) {
      setSeat(res);
    }
  };
  const getMemberByID = async () => {
    let res = await GetMemberByID();  
    if (res) {
      setMember(res[0]);
    }
  };
  useEffect(() => {
    getAllSeat();
    getMemberByID();
  }, []);
  async function submit() {
    // let data = {

    //   MemberID:
    //     typeof booking.MemberID === "string" ? parseInt(booking.MemberID) : 0,
    //   ShowtimeID:
    //     typeof booking.ShowtimeID === "string" ? parseInt(booking.ShowtimeID) : 0,
    //   SeatID:
    //     typeof booking.SeatID === "string" ? parseInt(booking.SeatID) : 0,
    //   SeatIDs: selectedSeats,
    // };
    let res = await CreateBooking(booking);
    console.log(res)

    if (res.status) {
      setAlertMessage("กรุณาชำระเงินในหน้าต่อไป");
      setSuccess(true);
    } else {
      setAlertMessage(res.message);
      setError(true);
    }
  }
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const handleSeatSelection = (seatID: string) => {
      // โค้ดในฟังก์ชัน handleSeatSelection
      if (selectedSeats.includes(seatID)) {
        setSelectedSeats(selectedSeats.filter((seat) => seat !== seatID));
      } else {
        setSelectedSeats([...selectedSeats, seatID]);
      }
    };

    function OnSelectSeat(seatID:number | undefined,e:React.ChangeEvent<HTMLInputElement>) {
      if(e.currentTarget.checked){
        const data:BookingInterface={
          MemberID:member?.ID!,
          
          ShowtimeID:Bookdata?.ShowtimeID!,
          SeatID:seatID!
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
          <nav>
            <NavbarUser />

          </nav>
          {/*  nav end */}

          {/* adverse start */}
          <section className="background">
            <li><img src={background} alt="" /></li>
          </section>

          <div>
            <div>
              <div className='box'>
                <div className='screen'>
                  <div className='tv'>
                    SCREEN
                  </div>

                  <div className="row-column">
                    <li className="row row--1">
                        <ol className="seats" type="A">
                        {seat.slice(0,6).map((a)=>(
                          <li className="seat">
                            <input type="checkbox" id={a.Seatnum} onChange={(e)=> OnSelectSeat(a.ID,e)} disabled={a.Status==="Unavailable"}/>
                            <label htmlFor={a.Seatnum}>{a.Seatnum}</label>
                          </li>
                        ))}
                        </ol>
                    </li>
                    <li className="row row--2">
                        <ol className="seats" type="A">
                        {seat.slice(6,12).map((a)=>(
                          <li className="seat">
                            <input type="checkbox" id={a.Seatnum} onChange={(e)=> OnSelectSeat(a.ID,e)} disabled={a.Status==="Unavailable"}/>
                            <label htmlFor={a.Seatnum}>{a.Seatnum}</label>
                          </li>
                        ))}
                        </ol>
                    </li>
                    <li className="row row--3">
                        <ol className="seats" type="A">
                        {seat.slice(12,18).map((a)=>(
                          <li className="seat">
                            <input type="checkbox" id={a.Seatnum} onChange={(e)=> OnSelectSeat(a.ID,e)} disabled={a.Status==="Unavailable"}/>
                            <label htmlFor={a.Seatnum}>{a.Seatnum}</label>
                          </li>
                        ))}
                        </ol >
                    </li>
                    <li className="row row--4">
                        <ol className="seats" type="A">
                        {seat.slice(18,24).map((a)=>(
                          <li className="seat">
                            <input type="checkbox" id={a.Seatnum} onChange={(e)=> OnSelectSeat(a.ID,e)} disabled={a.Status==="Unavailable"}/>
                            <label htmlFor={a.Seatnum}>{a.Seatnum}</label>
                          </li>
                        ))}
                        </ol>
                    </li>
                    <li className="row row--5">
                        <ol className="seats" type="A">
                        {seat.slice(24,30).map((a)=>(
                          <li className="seat2">
                            <input type="checkbox" id={a.Seatnum} onChange={(e)=> OnSelectSeat(a.ID,e)} disabled={a.Status==="Unavailable"}/>
                            <label htmlFor={a.Seatnum}>{a.Seatnum}</label>
                          </li>
                        ))}
                        </ol>
                    </li>
                  
                  </div>
                  

                  <div className='price'>
                    <a className='normal'>Price(Normal)</a><a className='vip'>Price(VIP)</a>
                  </div>
                </div>
                <div className='pay'>
                  <li><Link className='button' onClick={submit} to="/payment"> Booking</Link></li>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  
}
export default SeatComp;
