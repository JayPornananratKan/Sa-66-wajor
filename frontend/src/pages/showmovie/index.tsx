import React, { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, Modal, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import { Link, useNavigate } from "react-router-dom";
import { movieInterface } from "../interface/Imovie";
import { DeleteMovie, GetMovie } from "../service/httpClientService";

function Showmovie() {
  
  const columns: ColumnsType<movieInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
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
    // {
    //   title: "ff",
    //   dataIndex: "Typemovie",
    //   key: "typemovie",
    //   render: (item) => item.TypeNamemovie,
    // },

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
          <Button  onClick={() =>  navigate(`/modify/${record.ID}`)} shape="circle" icon={<EditOutlined />} size={"large"} />
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
    setModalText(
      `คุณต้องการลบข้อมูลผู้ใช้ "${val.Name} หรือไม่ ?`
    );
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
    <>
      {contextHolder}
      <Row>
        <Col span={12}>
          <h2>จัดการข้อมูลสมาชิก</h2>
        </Col>
        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
          <Space>
            <Link to="/moviesin">
              <Button type="primary" icon={<PlusOutlined />}>
                สร้างข้อมูล
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>
      <Divider />
      <div style={{ marginTop: 20 }}>
        <Table rowKey="ID" columns={columns} dataSource={movie} />
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
    </>
  );
}

export default Showmovie;
