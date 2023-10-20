// import React from 'react';
import '../../App.css';
// import './createshowtime.css';
import logo from "../../assets/logo.png"
import กู from "../../assets/กู.png"
import background from "../../assets/cin3.jpg"
import { DatePicker, DatePickerProps, Input, Select, Space, TimePicker } from 'antd';
import { movieInterface } from '../interface/Imovie';
import { DefaultOptionType } from 'antd/es/select';
import React, { useEffect, useState } from 'react';
import { ShowtimeInterface } from '../interface/Ishowtime';
// ...
import {
    GetAdmin,
    CreateShowtimes,
    GetMovie,
    GetTheatre,
  } from "../service/httpClientService";
import Navbar from '../../Navbar/navbar';
import { TheatreInterface } from '../interface/Itheatre';
function ModifyShowTime() {
    const [message, setAlertMessage] = React.useState("");
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    async function submit() {
        let data = {
          MovieID: typeof showtime.MovieID === "string" ? parseInt(showtime.MovieID) : showtime.MovieID, // เพิ่ม MovieID
          Datie: showtime.Datie, // เปลี่ยนเป็น Release
          Time: showtime.Time,
          TheatreID:typeof showtime.TheatreID === "string" ? parseInt(showtime.TheatreID) : showtime.TheatreID,
        };
      
        let res = await CreateShowtimes(data);
      
        if (res.status) {
          setAlertMessage("บันทึกข้อมูลสำเร็จ");
          setSuccess(true);
        } else {
          setAlertMessage(res.message);
          setError(true);
        }
      }
      
    const handleChangeMovie = (value: any, option: DefaultOptionType | DefaultOptionType[]): void => {
        setShowtime({
          ...showtime,
          MovieID: value,
        });
      };
      const handleChangeTheatre = (value: any, option: DefaultOptionType | DefaultOptionType[]): void => {
        setShowtime({
          ...showtime,
          TheatreID: value,
        });
      };
    const [showtime, setShowtime] = React.useState<Partial<ShowtimeInterface>>({
        // MovieID: 0,
        
    });
    const [Release, setRelease] = useState<Date | null>(null);

    // ... ส่วนอื่น ๆ ของคอมโพเนนต์
    const [movie, setMovie] = React.useState([]); // ตัวแปรที่จะเก็บข้อมูลภาพยนตร์
    const [theatre, setTheatre] = React.useState([]); // ตัวแปรที่จะเก็บข้อมูลภาพยนตร์
    const handleDateChange: DatePickerProps["onChange"] = (date, dateString) => {
        if (date) {
          setRelease(date.toDate());
          setShowtime({ ...showtime, Datie: dateString });
        }
      };

    const handleTimeChange = (time: any) => {
      const timeAsDate = time.toDate();
      const formattedTime = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setShowtime({ ...showtime, Time: time });
      };

      const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
        const id = event.target.id as keyof typeof ModifyShowTime;
    
        const { value } = event.target;
    
        setShowtime({ ...showtime, [id]: value });
      };
      const getmovie = async () => {
        let res = await GetMovie();
        if (res) {
          setMovie(res);
        }
      };
      const getTheatre = async () => {
        let res = await GetTheatre();
        if (res) {
          setTheatre(res);
        }
      };
      useEffect(() => {
        getmovie();
        getTheatre();
      }, []);
    return (
        <div className="App">
            {/* Nav Start */}
            <nav>
            <Navbar />
          </nav>
            {/*  nav end */}
            
            <section className="background">
                
                <li><img src={background} alt="" /></li>
                
            </section>
            
            <section className="manage">
                <div className="title-1">
                    {/* <a className='back'href="/manageShow">กลับ</a> */}
                    <a>แก้ไขรอบฉาย</a>
                    <li><a className= "confirm-button" onClick={submit} >ยืนยัน</a></li>
                    <li><a className= "cancel-button"href="/manageShow">ยกเลิก</a></li>
                </div>

                
                <div className="box-2">
                    <a className='mname'>ชื่อภาพยนตร์</a>
                    <a className='showtime'>เวลาฉาย</a>
                    <a className='date'>วันที่ฉาย</a>
                    <a className='theatre'>โรงที่ฉาย</a>
                    <a className=''>
                    <Select
                        className="Moviename"
                        value={showtime.MovieID}
                        onChange={handleChangeMovie} // ให้สร้างฟังก์ชัน handleChangeMovie เพื่อจัดการการเปลี่ยนค่าใน combo box
                    >
                        {movie.map((item: movieInterface) => (
                            <option value={item.ID}>{item.Name}</option>
                        ))}
                    </Select>
                    </a>
                    <div className="datetime">
                        <Space direction="vertical">
                          
                        <DatePicker  onChange={handleDateChange} />
                        {/* สร้าง DatePicker อื่น ๆ และกำหนด onChange ให้เป็น handleDateChange เช่นเดียวกัน */}
                        </Space>
                    </div>
                    {/* <div className="time"> */}
                        {/* <Space direction="vertical">
                          
                        <TimePicker  onChange={handleTimeChange} />
                        </Space> */}
                       <Input id="Time" className="time" placeholder="เวลา"  value={showtime.Time} onChange={handleInputChange} />
                    {/* </div> */}
                    <a className='t'>
                    <Select
                        className="Theatre"
                        value={showtime.TheatreID}
                        
                        onChange={handleChangeTheatre} // ให้สร้างฟังก์ชัน handleChangeMovie เพื่อจัดการการเปลี่ยนค่าใน combo box
                    >
                        {theatre.map((item: TheatreInterface) => (
                            <option value={item.ID}>{item.TheatreName}</option>
                        ))}
                    </Select>
                    </a>
                </div>
                
            </section>
            {/* adverse start */}

            <section className="">
            
            </section>
            {/* adverse end */}
        </div>
        
        
    );
}

export default ModifyShowTime;
function setAlertMessage(arg0: string) {
    throw new Error('Function not implemented.');
}

function setSuccess(arg0: boolean) {
    throw new Error('Function not implemented.');
}

