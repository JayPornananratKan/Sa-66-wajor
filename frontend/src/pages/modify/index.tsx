import React, { useState, useEffect } from "react";
import "../css/movie.css";
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Upload } from "antd";
import Navbar from "../../Navbar/navbar";
import {
  Alert,
  FormControl,
  Select,
  SelectChangeEvent,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { movieInterface } from "../interface/Imovie";
import { TypeInterface } from "../interface/Itype";
import {
  CreateMovie,
  GetMovie,
  GetMovieById,
  GetRate,
  GetTypemovie,
  UpdateMovie,
} from "../service/httpClientService";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";

import { RateInterface } from "../interface/Irate";

const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const props: UploadProps = {
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange({ file, fileList }) {
    if (file.status !== "uploading") {
      console.log(file, fileList);
    }
  },
};

function Modify() {
  const { TextArea } = Input;
  const { id } = useParams();
  const navigate = useNavigate();
  const [newmovie, setnewMovie] = React.useState<Partial<movieInterface>>({});
  const [movie, setMovie] = React.useState<Partial<movieInterface>>({
    ID: Number(id),
    Name: newmovie.Name,
    Length: newmovie.Length,
    Release: newmovie.Release,
    Director: newmovie.Director,
    Actor: newmovie.Actor,
    Short_Story: newmovie.Short_Story,
    TypemovieID: newmovie.TypemovieID,
    RateID: newmovie.RateID,
  });

  const [Release, setRelease] = useState<Date | null>(null);
  const [rates, setRates] = React.useState<RateInterface[]>([]);
  const [typemovies, setTypemovies] = React.useState<TypeInterface[]>([]);
  const [message, setAlertMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [active, setActive] = useState(false);

  const getTypemovie = async () => {
    let res = await GetTypemovie();
    if (res) {
      setTypemovies(res);
    }
  };

  const getRatemovie = async () => {
    let res = await GetRate();
    if (res) {
      setRates(res);
    }
  };
  const getmoviebyid = async () => {
    let res = await GetMovieById(Number(id));
    if (res) {
      setnewMovie(res);

    }
  };
  useEffect(() => {
    getmoviebyid();
    getTypemovie();
    getRatemovie();
  }, []);
  console.log(movie);
  console.log(newmovie);


  async function submit() {
    let data = {
      ID: Number(id),
      Name: newmovie.Name ?? "",
      Release: newmovie.Release,
      Length:
        typeof newmovie.Length === "string"
          ? parseInt(newmovie.Length)
          : newmovie.Length, // Ensure Length is a number
      Director: newmovie.Director ?? "",
      Actor: newmovie.Actor ?? "",
      Short_Story: newmovie.Short_Story ?? "",
      TypemovieID:
        typeof newmovie.TypemovieID === "string"
          ? parseInt(newmovie.TypemovieID)
          : newmovie.TypemovieID,
      RateID:
        typeof newmovie.RateID === "string"
          ? parseInt(newmovie.RateID)
          : newmovie.RateID,
    };

    let res = await UpdateMovie(data);

    if (res.status) {
      setAlertMessage("บันทึกข้อมูลสำเร็จ");
      setSuccess(true);
      setTimeout(function () {
        navigate("/Showmovie");
      }, 2000);
    } else {
      setAlertMessage(res.message);
      setError(true);
    }
  }
  const handleChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof newmovie;
    setnewMovie({
      ...newmovie,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Modify;

    const { value } = event.target;

    setnewMovie({ ...newmovie, [id]: value });
  };
  //-----------------------handler-------------------------------
  const handleDateChange: DatePickerProps["onChange"] = (date) => {
    if (date) {
      setRelease(date.toDate());
    }
  };

  const handleInputChangenumber = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof newmovie;
    const { value } = event.target;
    setnewMovie({ ...newmovie, [id]: value === "" ? "" : Number(value) });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,

    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);

    setError(false);
  };

  /* body */
  return (
    <div className="app">
      <Snackbar
        id="success"
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>

      <Snackbar
        id="error"
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
      <nav>
        <Navbar />
      </nav>
      <div className="Contrainer">
        <div className="head">
          <a>แก้ไขข้อมูลภาพยนตร์</a>
          <Button type="primary" onClick={submit}>
            submit
          </Button>
        </div>
        <div className="grid-contrainer">
          <div className="grid  ">
            <div className="grid-item grid1">ชื่อภาพยนตร์</div>
            <div className="grid-item grid2">
            <Input
                id="Name"
                className="inputbar"
                placeholder="Basic usage"
                value={newmovie?.Name || " "}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid-item grid3">ความยาวหนัง</div>
            <div className="grid-item grid4">
              <Input
                id="Length"
                className="inputbar"
                placeholder="Basic usage"
                value={newmovie?.Length || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid-item grid5">ประเภทภาพยนตร์</div>
            <div className="grid-item grid6">
              <Select
                id="TypeMovieID"
                className="comboboxbar"
                native
                value={newmovie?.TypemovieID}
                onChange={handleChange}
                inputProps={{
                  name: "TypeMovieID",
                }}
              >
                <option aria-label="None" value="">
                  ประเภทภาพยนตร์
                </option>
                {typemovies.map((item: TypeInterface) => (
                  <option value={item.ID}>{item.TypeNamemovie}</option>
                ))}
              </Select>
            </div>
            <div className="grid-item grid7">วันที่ฉาย</div>
            <div className="grid-item grid8">
              <Space direction="vertical">
                <DatePicker id="Release" onChange={onChange}   />
                {/* สร้าง DatePicker อื่น ๆ และกำหนด onChange ให้เป็น handleDateChange เช่นเดียวกัน */}
              </Space>
            </div>
            <div className="grid-item grid9">ผู้กำกับ</div>
            <div className="grid-item grid10">
              <Input
              id="Director"
                className="inputbar"
                placeholder="Basic usage"
                value={newmovie.Director || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid-item grid11">นักแสดงหลัก</div>
            <div className="grid-item grid12">
              <Input
                  id="Actor"
                  className="inputbar"
                  value={newmovie.Actor || ""}
                  onChange={handleInputChange}
                  
              />
            </div>

            <div className="grid-item grid13">โปสเตอร์</div>
            <div className="grid-item grid14">
              <Upload {...props}>
                <Button className="inputbar" icon={<UploadOutlined />}>
                  Upload
                </Button>
              </Upload>
            </div>

            <div className="grid-item grid15">เรทหนัง</div>
            <div className="grid-item grid16">
              <Select
                id="RateID"
                className="comboboxbar"
                native
                value={newmovie.RateID}
                onChange={handleChange}
                inputProps={{
                  name: "RateID",
                }}
              >
                <option aria-label="None" value="">
                  เรทหนัง
                </option>
                {rates.map((item: RateInterface) => (
                  <option value={item.ID}>{item.RateName}</option>
                ))}
              </Select>
            </div>

            <div className="grid-item grid17">เรื่องย่อ</div>
            <div className="grid-item grid18">
              <>
                <TextArea
                  id="Short_Story"
                  className="inputbar"
                  value={newmovie.Short_Story || ""}
                  onChange={handleInputChange}
                  rows={4}
                />
                <br />
                <br />
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Modify;
