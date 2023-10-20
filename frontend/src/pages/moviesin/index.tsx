import React, { useState, useEffect } from "react";
import "../css/movie.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
  GetRate,
  GetTypemovie,
} from "../service/httpClientService";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import { RateInterface } from "../interface/Irate";
import background from "../../assets/cin3.jpg"
const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};

function MovieIn() {
  const { TextArea } = Input;

  const handleChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof movie;
    setMovie({
      ...movie,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof MovieIn;

    const { value } = event.target;

    setMovie({ ...movie, [id]: value });
  };

  const [movie, setMovie] = React.useState<Partial<movieInterface>>({
    Length: 1,
    TypemovieID: 0,
    RateID: 0,
  });
  const [typemovies, setTypemovies] = React.useState<TypeInterface[]>([]);
  const [rates, setRates] = React.useState<RateInterface[]>([]);
  const [Release, setRelease] = useState<Date | null>(null);
  const [message, setAlertMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [Poster, setPoster] = useState("")
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
  const getmovie = async () => {
    let res = await GetMovie();
    if (res) {
      setMovie(res);
    }
  };
  useEffect(() => {
    getTypemovie();
    getmovie();
    getRatemovie();
  }, []);

  console.log(typemovies);
  console.log(rates);
  async function submit() {
    let data = {
      Name: movie.Name ?? "",
      Release: Release,
      Length: typeof movie.Length === "string" ? parseInt(movie.Length) : 0, // Ensure Length is a number
      Director: movie.Director ?? "",
      Castor: movie.Actor ?? "",
      Short_story: movie.Short_Story ?? "",
      Poster: Poster,
      TypemovieID:
        typeof movie.TypemovieID === "string" ? parseInt(movie.TypemovieID) : 0,
      RateID: typeof movie.RateID === "string" ? parseInt(movie.RateID) : 0,
    };

    let res = await CreateMovie(data);

    if (res.status) {
      setAlertMessage("บันทึกข้อมูลสำเร็จ");
      setSuccess(true);
    } else {
      setAlertMessage(res.message);
      setError(true);
    }
  }
  
  const props: UploadProps = {
    beforeUpload: (file) => {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        if (e.target) {
          const base64Image = e.target.result as string; // Ensure it's a string
          setPoster(base64Image);
        }
      };
  
      reader.readAsDataURL(file);
      return false; // Prevent automatic upload
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };
  
  

  // -------------------headler------------------------------------
  const handleDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    if (date) {
      setRelease(date.toDate());
    }
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
    <div className="App">
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
      <section className="background">
        <li><img src={background} alt="" /></li>
      </section>

      <div className="Contrainer">
        <div className="head">
          <div>เพิ่มข้อมูลภาพยนตร์</div>
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
                value={movie.Name || ""}
                onChange={handleInputChange}
                placeholder="Basic usage"
              />
            </div>
            <div className="grid-item grid3">ความยาวหนัง</div>
            <div className="grid-item grid4">
              <Input
                id="Length"
                className="inputbar"
                placeholder="Basic usage"
                value={movie.Length}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid-item grid5">ประเภทภาพยนตร์</div>
            <div className="grid-item grid6">
              <Select
                className="comboboxbar"
                native
                value={movie.TypemovieID}
                onChange={handleChange}
                inputProps={{
                  name: "TypemovieID",
                }}
              >
                <option aria-label="None" value="">
                  ประเภทภาพยนตร์
                </option>
                {typemovies.map((item: TypeInterface) => (
                  <option value={item.ID}>{item.TypeName}</option>
                ))}
              </Select>
            </div>
            <div className="grid-item grid7">วันที่ฉาย</div>
            <div className="grid-item grid8">
              <Space direction="vertical">
                <DatePicker onChange={handleDateChange} />
                {/* สร้าง DatePicker อื่น ๆ และกำหนด onChange ให้เป็น handleDateChange เช่นเดียวกัน */}
              </Space>
            </div>
            <div className="grid-item grid9">ผู้กำกับ</div>
            <div className="grid-item grid10">
              <Input
                id="Director"
                className="inputbar"
                placeholder="Basic usage"
                value={movie.Director || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid-item grid11">นักแสดงหลัก</div>
            <div className="grid-item grid12">
              <Input
                id="Actor"
                className="inputbar"
                placeholder="นักแสดง"
                value={movie.Actor || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid-item grid13">โปสเตอร์</div>
            <div className="grid-item grid14">
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload png only</Button>
              </Upload>
            </div>
            <div className="grid-item grid15">เรทหนัง</div>
            <div className="grid-item grid16">
              <Select
                className="comboboxbar"
                native
                value={movie.RateID}
                onChange={handleChange}
                inputProps={{
                  name: "RateID",
                }}
              >
                <option aria-label="None" value="" >
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
                  value={movie.Short_Story || ""}
                  onChange={handleInputChange}
                  rows={2}
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
export default MovieIn;
