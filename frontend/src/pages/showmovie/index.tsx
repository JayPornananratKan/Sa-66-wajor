import React, { useState, useEffect } from "react";
import {
  Space,
  Table,
  Button,
  Col,
  Row,
  Divider,
  Modal,
  message,
  Image,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import { Link, useNavigate } from "react-router-dom";
import { movieInterface } from "../interface/Imovie";
import { DeleteMovie, GetMovie } from "../service/httpClientService";
import Navbar from "../../Navbar/navbar";
import background from "../../assets/cin3.jpg"
import "./showmovie.css"
function Showmovie() {
  const columns: ColumnsType<movieInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "รูป",
      dataIndex: "Poster",
      key: "Poster",
      render: (record) => {
        console.log(record); // ใส่บรรทัดนี้เพื่อดูค่า record ใน console
        return (
          <Image
            src={`${record}`}
            className="w3-left w3-circle w3-margin-right"
            width={100}
            height={100}
          />
        );
      },
    },

    {
      title: "ชื่อภาพยนตร์",
      dataIndex: "Name",
      key: "name",
    },
    {
      title: "ความยาวหนัง",
      dataIndex: "Length",
      key: "length",
    },

    {
      title: "วันที่ฉาย",
      dataIndex: "Release",
      key: "release",
    },
    {
      title: "ผู้กำกับ",
      dataIndex: "Director",
      key: "director",
    },
    {
      title: "นักแสดงหลัก",
      dataIndex: "Actor",
      key: "actor",
    },
    {
      title: "เรื่องย่อ",
      dataIndex: "Short_Story",
      key: "Short_Story",
    },
    {
      title: "เรท",
      dataIndex: "Rate",
      key: "rate",
      render: (item) => item.RateName,
    },
    {
      title: "จัดการ",
      dataIndex: "Manage",
      key: "manage",
      render: (text, record, index) => (
        <>
          <Button
            onClick={() => navigate(`/modify/${record.ID}`)}
            shape="circle"
            icon={<EditOutlined />}
            size={"large"}
          />
          <Button
            onClick={() => showModal(record)}
            style={{ marginLeft: 10 }}
            shape="circle"
            icon={<DeleteOutlined />}
            size={"large"}
            danger
          />
        </>
      ),
    },
  ];

  const navigate = useNavigate();
  const [movie, setMovie] = useState<movieInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();

  const getMovie = async () => {
    let res = await GetMovie();
    if (res) {
      setMovie(res);
    }
  };

  const showModal = (val: movieInterface) => {
    setModalText(`คุณต้องการลบข้อมูลผู้ใช้ "${val.Name} หรือไม่ ?`);
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeleteMovie(deleteId);
    if (res) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "ลบข้อมูลสำเร็จ",
      });
      getMovie();
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
    getMovie();
  }, []);

  return (
    <div className="App">
      <nav>
        <Navbar />
      </nav>
      <section className="background">
        <li><img src={background} alt="" /></li>
      </section>

      <div className="Contrainer">
        {contextHolder}

        <Link to="/moviesin">
          <Button type="primary" icon={<PlusOutlined />}>
            สร้างข้อมูล
          </Button>
        </Link>

        <Divider />
        <div style={{ marginTop: 20 }}>
          <Table
            rowKey="ID"
            columns={columns}
            dataSource={movie}
            pagination={{ pageSize: 3 }}
          />
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
      <footer>

      </footer>
    </div>
  );
}

export default Showmovie;
