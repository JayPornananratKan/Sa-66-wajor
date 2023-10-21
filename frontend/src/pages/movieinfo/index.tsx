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
  Select,
  SelectChangeEvent,
  Snackbar,
} from "@mui/material";
import { movieInterface } from "../interface/Imovie";
import { TypeInterface } from "../interface/Itype";
import {

  GetMovieById,
  GetRate,
  GetTypemovie,
  UpdateMovie,
} from "../service/httpClientService";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";

import { RateInterface } from "../interface/Irate";
import background from "../../assets/cin3.jpg"
const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
  
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}






function Movieinfo() {
  const { TextArea } = Input;
  const { id } = useParams();
  const navigate = useNavigate();
  const [oldmovie, setoldMovie] = React.useState<Partial<movieInterface>>({});
  const [movie, setMovie] = React.useState<Partial<movieInterface>>({
    ID: Number(id),
    Name: oldmovie.Name,
    Length: oldmovie.Length,
    Release: oldmovie.Release,
    Director: oldmovie.Director,
    Actor: oldmovie.Actor,
    Short_Story: oldmovie.Short_Story,
    Poster: oldmovie.Poster,
    TypemovieID: oldmovie.TypemovieID,
    RateID: oldmovie.RateID,
  });

  const [Release, setRelease] = useState<Date | null>(null);
  const [rates, setRates] = React.useState<RateInterface[]>([]);
  const [typemovies, setTypemovies] = React.useState<TypeInterface[]>([]);
  const [message, setAlertMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [poster,setPoster] = React.useState("");
  const [oldPoster, setOldPoster] = useState(""); 

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
      setoldMovie(res);
      setPoster(res.Poster);

    }
  };
  useEffect(() => {
    getmoviebyid();
    getTypemovie();
    getRatemovie();
  }, []);
  // console.log(movie);
  console.log(oldmovie);


  async function submit() {
    let data = {
      ID: Number(id),
      Name: oldmovie.Name ?? "",
      Release: oldmovie.Release,
      Length:
        typeof oldmovie.Length === "string"
          ? parseInt(oldmovie.Length)
          : oldmovie.Length, // Ensure Length is a number
      Director: oldmovie.Director ?? "",
      Actor: oldmovie.Actor ?? "",
      Short_Story: oldmovie.Short_Story ?? "",
      Poster: oldmovie.Poster ?? movie.Poster,
      TypemovieID:
        typeof oldmovie.TypemovieID === "string"
          ? parseInt(oldmovie.TypemovieID)
          : oldmovie.TypemovieID,
      RateID:
        typeof oldmovie.RateID === "string"
          ? parseInt(oldmovie.RateID)
          : oldmovie.RateID,
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
  
  const handleChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof oldmovie;
    setoldMovie({
      ...oldmovie,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Movieinfo;

    const { value } = event.target;

    setoldMovie({ ...oldmovie, [id]: value });
  };
  //-----------------------handler-------------------------------
  const handleInputChangenumber = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof oldmovie;
    const { value } = event.target;
    setoldMovie({ ...oldmovie, [id]: value === "" ? "" : Number(value) });
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
          {/* <a>แก้ไขข้อมูลภาพยนตร์</a> */}
          {/* <Button type="primary" onClick={submit}>
            submit
          </Button> */}
        </div>
        <div className="grid-contrainer">
          <div className="grid  ">
            <div className="grid-item grid1">ชื่อภาพยนตร์</div>
            <div className="grid-item grid2">
            <Input
                id="Name"
                className="inputbar"
                placeholder="Basic usage"
                value={oldmovie?.Name || " "}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid-item grid3">ความยาวหนัง</div>
            <div className="grid-item grid4">
              <Input
                id="Length"
                className="inputbar"
                placeholder="Basic usage"
                value={oldmovie?.Length || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid-item grid5">ประเภทภาพยนตร์</div>
            <div className="grid-item grid6">
              <Select
                id="TypeMovieID"
                className="comboboxbar"
                native
                value={oldmovie?.TypemovieID}
                onChange={handleChange}
                inputProps={{
                  name: "TypeMovieID",
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
                <DatePicker id="Release" name="Releasea" onChange={onChange} />
                {/* สร้าง DatePicker อื่น ๆ และกำหนด onChange ให้เป็น handleDateChange เช่นเดียวกัน */}
              </Space>
            </div>
            <div className="grid-item grid9">ผู้กำกับ</div>
            <div className="grid-item grid10">
              <Input
              id="Director"
                className="inputbar"
                placeholder="Basic usage"
                value={oldmovie.Director || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid-item grid11">นักแสดงหลัก</div>
            <div className="grid-item grid12">
              <Input
                  id="Actor"
                  className="inputbar"
                  value={oldmovie.Actor || ""}
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
                id="RateID"
                className="comboboxbar"
                native
                value={oldmovie.RateID}
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
                  value={oldmovie.Short_Story || ""}
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
export default Movieinfo;
