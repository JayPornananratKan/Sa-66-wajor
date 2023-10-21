import React, { useState, useEffect } from "react";
import "../css/movie.css";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Upload } from "antd";
import Navbar from "../../Navbar/navbar";
import { Alert, Select, SelectChangeEvent, Snackbar } from "@mui/material";
import { movieInterface } from "../interface/Imovie";
import { TypeInterface } from "../interface/Itype";
import {
  GetMovieById,
  GetRate,
  GetTypemovie,
  UpdateMovie,
} from "../service/httpClientService";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { RateInterface } from "../interface/Irate";
import background from "../../assets/cin3.jpg";

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
    Poster: newmovie.Poster,
    TypemovieID: newmovie.TypemovieID,
    RateID: newmovie.RateID,
  });

  const [Release, setRelease] = useState<Date | null>(null);
  const [rates, setRates] = React.useState<RateInterface[]>([]);
  const [typemovies, setTypemovies] = React.useState<TypeInterface[]>([]);
  const [message, setAlertMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [poster, setPoster] = React.useState("");

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

      setPoster(res.Poster);
    }
  };
  useEffect(() => {
    getmoviebyid();
    getTypemovie();
    getRatemovie();
    setRelease(newmovie.Release ? new Date(newmovie.Release) : null);
  }, [newmovie.Release]);
  console.log(movie);
  console.log(newmovie);

  const handleDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    if (date) {
      const dateAsDate = date.toDate();
      setRelease(dateAsDate);
    }
  };
  
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
      Poster: newmovie.Poster ?? movie.Poster,
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
  const props: UploadProps = {
    beforeUpload: (file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          const base64Image = e.target.result as string; // Ensure it's a string
          setPoster(base64Image);
          // Update newmovie's Poster property
          setnewMovie({ ...newmovie, Poster: base64Image });
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
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
      <nav>
        <Navbar />
      </nav>
      <section className="background">
        <li>
          <img src={background} alt="" />
        </li>
      </section>

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
                className="comboboxbar"
                native
                value={newmovie?.TypemovieID}
                onChange={handleChange}
                inputProps={{
                  name: "TypemovieID",
                }}
              >
                <option aria-label="None" value="">
                  เรทหนัง
                </option>
                {typemovies.map((item: TypeInterface) => (
                  <option value={item.ID}>{item.TypeName}</option>
                ))}
              </Select>
              
            </div>
            <div className="grid-item grid7">วันที่ฉาย</div>
            <div className="grid-item grid8">
              <DatePicker
                format="YYYY-MM-DD"
                id="Release"
                name="Release"
                onChange={handleDateChange}
                value={Release ? dayjs(Release) : null}
              />
              {/* Render the selected release date */}  
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
                <Button icon={<UploadOutlined />}>Upload png only</Button>
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
export default Modify;
