import { Link, useNavigate } from "react-router-dom";
import './mainUser.css';
import background from "../../assets/cin3.jpg"
import { ShowtimeInterface } from "../interface/Ishowtime";
import { GetAllShowtime, GetTheatre } from "../service/httpClientService";
import { GetShowtimeByID2 } from "../service/httpClientService";
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
import Table, { ColumnsType } from "antd/es/table";
import { Button } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined,ArrowRightOutlined,InfoOutlined } from "@ant-design/icons";
import { TheatreInterface } from "../interface/Itheatre";
interface MainProps{
  setData: React.Dispatch<React.SetStateAction<BookingInterface | undefined>>
}

const MainUser = ({setData}:MainProps) => {



  const columns: ColumnsType<ShowtimeInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    // {
    //   title: "รูปภาพยนตร์",
    //   dataIndex: "Poster",
    //   key: "Poster",
    //   render: (movieID: number) => {
    //     // const posters = movie.find(posters => posters.ID === movieID);
    //     // return posters ? posters.Poster : 'ไม่พบรูปภาพยนตร์';
    //     const movies = movie.find(movies => movies.ID === movieID);
    //     return movies ? movies.Poster : 'ไม่พบรูปภาพยนตร์';
    //   }
    // },
    {
      title: "รูปภาพยนตร์",
      dataIndex: "MovieID",
      key: "Poster",
      render: (movieID: number) => {
        const moviess = movies.find(moviess => moviess.ID === movieID);
        return (
          <img  src={moviess?.Poster} alt="ไม่พบรูปภาพยนตร์" style={{ maxWidth: "100px" }} />
        );
      }
    },
    
    {
      title: "ชื่อภาพยนตร์",
      dataIndex: "MovieID",
      key: "movie",
      render: (movieID: number) => {
        const moviess = movies.find(moviess => moviess.ID === movieID);
        return moviess ? moviess.Name : 'ไม่พบภาพยนตร์';
      }
    },
    {
      title: "ความยาวภาพยนตร์(นาที)",
      dataIndex: "MovieID",
      key: "movie",
      render: (movieID: number) => {
        const moviess = movies.find(moviess => moviess.ID === movieID);
        
        return moviess ? moviess.Length : 'ไม่พบภาพยนตร์';
        
      }
    },
    {
      title: "เรท",
      dataIndex: "MovieID",
      key: "movie",
      render: (movieID: number) => {
        const moviess = movies.find(moviess => moviess.ID === movieID);
        
        return moviess ? moviess.Rate?.RateName : 'ไม่พบภาพยนตร์';
        
      }
    },
    {
      title: "ประเภท",
      dataIndex: "MovieID",
      key: "movie",
      render: (movieID: number) => {
        const moviess = movies.find(moviess => moviess.ID === movieID);
        
        return moviess ? moviess.Typemovie?.TypeName : 'ไม่พบภาพยนตร์';
        
      }
    },
    
    
    {
      title: "เวลาฉาย",
      dataIndex: "Time",
      key: "time",
    },

    {
      title: "วันที่ฉาย",
      dataIndex: "Datie",
      key: "datie",
    },
    {
      title: "โรงที่ฉาย",
      dataIndex: "TheatreID",
      key: "theatre",
      render: (theatreID: number) => {
        const theatres = theatre.find(theatres => theatres.ID === theatreID);
        
        return theatres ? theatres.TheatreName : 'ไม่พบโรงภาพยนตร์';
        
      }
    },
    {
      title: "ข้อมูลหนัง",
      dataIndex: "Movieinfo",
      key: "movieinfo",
      render: (text, record, index) => (
        <>
        <Button
            onClick={() => navigate(`/movieinfo/${record.ID}`)}
            style={{ marginLeft: 10 }}
            shape="circle"
            icon={<InfoOutlined />}
            size={"large"}
          />
        </>
          

      ),
    },
    {
      title: "เลือกรอบฉาย",
      dataIndex: "Showtime",
      key: "showtime",
      render: (text, record, index) => (
        <a
          key={record.ID}
          className={`t ${selectedShowtime === record.ID ? 'selected' : ''}`}
          onClick={() => handleShowtimeSelection(record.ID!)}
        >
          {record.Time}
        </a>
      )
    },
    
  ];
  const [theatre, setTheatre] = React.useState<TheatreInterface[]>([]);
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
    let res = await GetShowtimeByID2();  
    if (res) {
      setShowtime(res[0]);
    }
  };
  const getTheatre = async () => {
    const res = await GetTheatre(); // เรียกใช้ getShowtime แทน GetShowtime
    if (res) {
        setTheatre(res);
    }
}
  useEffect(() => {
    getTheatre();
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
            <NavbarUser />
         </nav>

         <section className="background">
          <li><img src={background} alt="" /></li>
          </section>
          <div style={{ marginTop: 20 }}>
            <Table rowKey="ID" columns={columns}  dataSource={show} />
          </div>
  
        </header>
        </div>
      
      
      </>
    
    );
  }
  export default MainUser;