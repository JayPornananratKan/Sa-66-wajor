import './manageshow.css';
import React, { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, Modal, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import { Link, useNavigate } from "react-router-dom";
import { DeleteShowtime, GetAllShowtime, GetMovie} from "../service/httpClientService";
import Navbar from "../../Navbar/navbar";
import { ShowtimeInterface } from '../interface/Ishowtime';
import { movieInterface } from '../interface/Imovie';
import background from "../../assets/cin3.jpg"



function ManageShow() {
    
    const columns: ColumnsType<ShowtimeInterface> = [
      {
        title: "ลำดับ",
        dataIndex: "ID",
        key: "id",
      },
      // {
      //   title: "ชื่อภาพยนตร์",
      //   dataIndex: "Movie",
      //   key: "movie",
      //   render: (item: ShowtimeInterface) => item.Movie?.Name || 'ไม่ระบุชื่อ',
      // },
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
      },
      {
        title: "จัดการ",
        dataIndex: "Manage",
        key: "manage",
        render: (text, record, index) => (
          <>
            <Button
              onClick={() => navigate(`/modifyShowtime`)}
              shape="circle"
              icon={<EditOutlined />}
              size={"large"}
            />
            <Button
              onClick={() => showModal(record)}
              style={{ marginLeft: 10 }}
              shape="circle"
              icon={<DeleteOutlined  />}
              size={"large"}
              danger
            />
          </>
        ),
      },
    ];
    

    const [movie, setMovie] = React.useState<movieInterface[]>([]);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState<String>();
    const [deleteId, setDeleteId] = useState<Number>();
    const [showtime, setShowtime] = useState<ShowtimeInterface[]>([]);
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
    useEffect(() => {
      getmovie();
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
  
    useEffect(() => {
      getShowtime();
    }, []);
  
    return (
      <div className="app">
          <nav>
            <Navbar />
          </nav>

            <section className="background">
                <li><img src={background} alt="" /></li>
            </section>
        <div className="Contrainer">
          {contextHolder}
              
                <Link to="/createShowtime">
                  <Button type="primary" icon={<PlusOutlined />}>
                    สร้างข้อมูล
                  </Button>
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
export default ManageShow;


