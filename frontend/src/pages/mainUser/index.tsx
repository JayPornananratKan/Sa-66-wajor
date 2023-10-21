// import './manageshow.css';
import React, { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, Modal, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined,ArrowRightOutlined,InfoOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import { Link, useNavigate } from "react-router-dom";
import { DeleteShowtime, GetAllShowtime, GetMovie, GetTheatre} from "../service/httpClientService";
import Navbar from "../../Navbar/navbar";
import { ShowtimeInterface } from '../interface/Ishowtime';
import { movieInterface } from '../interface/Imovie';
import background from "../../assets/cin3.jpg"
import { TheatreInterface } from "../interface/Itheatre";
import { BookingInterface } from "../interface/Ibooking";
import { MembersInterface } from "../interface/Imember";
import NavbarUser from "../../Navbar/navbarUser";
// interface MainProps{
//   setData: React.Dispatch<React.SetStateAction<BookingInterface | undefined>>
// }


function MainUser () {
    
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
          const movies = movie.find(movies => movies.ID === movieID);
          return (
            <img  src={movies?.Poster} alt="ไม่พบรูปภาพยนตร์" style={{ maxWidth: "100px" }} />
          );
        }
      },
      
      {
        title: "ชื่อภาพยนตร์",
        dataIndex: "MovieID",
        key: "movie",
        render: (movieID: number) => {
          const movies = movie.find(movies => movies.ID === movieID);
          return movies ? movies.Name : 'ไม่พบภาพยนตร์';
        }
      },
      {
        title: "ความยาวภาพยนตร์(นาที)",
        dataIndex: "MovieID",
        key: "movie",
        render: (movieID: number) => {
          const movies = movie.find(movies => movies.ID === movieID);
          
          return movies ? movies.Length : 'ไม่พบภาพยนตร์';
          
        }
      },
      {
        title: "เรท",
        dataIndex: "MovieID",
        key: "movie",
        render: (movieID: number) => {
          const movies = movie.find(movies => movies.ID === movieID);
          
          return movies ? movies.Rate?.RateName : 'ไม่พบภาพยนตร์';
          
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
        dataIndex: "Manage",
        key: "manage",
        render: (text, record, index) => (
          <>
          {/* {showtime.map((showtime) => (
              <a
              key={showtime.ID}
              className={`t ${selectedShowtime.includes(showtime.ID.toString()) ? 'selected' : ''}`}
              onClick={() => handleShowtimeSelection(showtime.ID!)}
              >
               {`${showtime.Datie}`}
              </a>))} */}
            
            
          </>
        ),
      },
    ];
    // const [selectedShowtime, SetselectedShowtime] = useState<string[]>([]);
    //   const [member, setMember] = useState<MembersInterface>();
    const [theatre, setTheatre] = React.useState<TheatreInterface[]>([]);
    const [movie, setMovie] = React.useState<movieInterface[]>([]);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState<String>();
    const [deleteId, setDeleteId] = useState<Number>();
    const [showtime, setShowtime] = useState<ShowtimeInterface[]>([]);
    // const handleShowtimeSelection = (showtimeID:number) => {
    //   const data:BookingInterface={
    //     MemberID:member?.ID!,
    //     ShowtimeID:showtimeID!,
    //     SeatID:0
    //   }}
    const getShowtime = async () => {
        const res = await GetAllShowtime(); // เรียกใช้ getShowtime แทน GetShowtime
        if (res) {
            setShowtime(res);
        }
    }
    const getmovie = async () => {
      let res = await GetMovie();
      if (res) {
        setMovie(res);
      }
    };
    const getTheatre = async () => {
      const res = await GetTheatre(); // เรียกใช้ getShowtime แทน GetShowtime
      if (res) {
          setTheatre(res);
      }
  }
    useEffect(() => {
      getmovie();
    }, []);
    useEffect(() => {
      getShowtime();
      getTheatre();
    }, []);
    
  
    const showModal = (val: ShowtimeInterface) => {
      setModalText(`คุณต้องการลบข้อมูลรอบฉาย "${val.ID} หรือไม่ ?`);
      setDeleteId(val.ID);
      setOpen(true);
    };
  
    const handleOk = async () => {
      setConfirmLoading(true);
      let res = await DeleteShowtime(deleteId);
      if (res) {
        setOpen(false);
        messageApi.open({
          type: "success",
          content: "ลบข้อมูลสำเร็จ",
        });
        getShowtime();
      } else {
        setOpen(false);
        messageApi.open({
          type: "error",
          content: "เกิดข้อผิดพลาด !",
        });
      }
      setConfirmLoading(false);
    };
  
    const handleCancel = () => {
      setOpen(false);
    };
  
    
  
    return (
      <div className="app">
          <nav>
            <NavbarUser />
          </nav>

            <section className="background">
                <li><img src={background} alt="" /></li>
            </section>
        <div className="Contrainer">
          {contextHolder}
              
                <Link to="/createShowtime">
                  {/* <Button type="primary" icon={<PlusOutlined />}>
                    สร้างข้อมูล
                  </Button> */}
                </Link>
              
          <Divider />
          <div style={{ marginTop: 20 }}>
            <Table rowKey="ID" columns={columns}  dataSource={showtime} />
          </div>
          <Modal
            title="ลบข้อมูล ?"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <p>{modalText}</p>
          </Modal>
        </div>
      </div>
    );
  }
export default MainUser;


