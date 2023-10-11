import React, { useEffect, useState } from 'react';
import '../../App.css';
import './checkin.css';
import logo from "../../assets/logo.png"
import กู from "../../assets/กู.png"
import ก็กู from "../../assets/ก็กู.jpg"
import background from "../../assets/cin3.jpg"
import Navbar from '../../Navbar/navbar';
import { CheckinInterface } from '../interface/Icheckin';
import { TicketNumberInterface } from '../interface/Iticketnumber';
import { Input } from 'antd';
import { AdminsInterface } from '../interface/Iadmin';

//--------------------------------------------------------//
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
//--------------------------------------------------------//

import {
  GetAdmin,
  GetTicketNumber,
  // Checkin,
  CreateCheckin,
  GetCheckin,
} from "../service/httpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Checkin() {

  const [admins, setAdmins] = useState<AdminsInterface[]>([]);
  const [ticketnumbers, setTicketNumbers] = useState<TicketNumberInterface[]>([]);
  const [checkin, setCheckin] = useState<Partial<CheckinInterface>>({
    // AdminID: 0,
    // TicketNumberID: 0,
  });
  const [Datie, setDatie] = useState<Date | null>(null);
  const [message, setAlertMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Checkin;

    const { value } = event.target;

    setCheckin({ ...checkin, [id]: value });
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

  const getAdmin = async () => {
    let res = await GetAdmin();
    if (res) {
      setAdmins(res);
    }
  };
  const getTicketNumber = async () => {
    let res = await GetTicketNumber();
    if (res) {
      setTicketNumbers(res);
    }
  };

  const getCheckin = async () => {
    let res = await GetCheckin();
    if (res) {
      setCheckin(res);
    }
  };
  useEffect(() => {
    getAdmin();
    getTicketNumber();
    getCheckin();
  }, []);
  console.log(admins);
  console.log(ticketnumbers);
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  console.log(admins);
  console.log(ticketnumbers);

  async function submit() {

    let data = {
      TicketNumberID: 
       typeof checkin.TicketNumberID === "string" ? parseInt(checkin.TicketNumberID) : checkin.TicketNumberID,
      AdminID: 
       typeof checkin.AdminID === "string" ? parseInt(checkin.AdminID) : checkin.AdminID,
    };
    console.log("data" + data);
    let res = await CreateCheckin(data);

    if (res.status) {
      setAlertMessage("บันทึกข้อมูลสำเร็จ");
      setSuccess(true);
    } else {
      setAlertMessage(res.message);
      setError(true);
    }
  }

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
      {/* Nav Start */}
      <nav>
        <Navbar />
      </nav>
      {/*  nav end */}

      <section className="background">
        <li><img src={background} alt="" /></li>
      </section>

      {/* check start */}
      <section className="check">
        <div className="con">
          <div className="title">
            <h1>เช็คอิน</h1>
          </div>

          <div className="check-con">
            <div className="check-item">
              <h1 >รหัสตั๋ว</h1>
              <Input id="TicketNumberID" className="inputbar" placeholder="Basic usage"  value={checkin.TicketNumberID} onChange={handleInputChange} />

              <h2 >รหัสประจำตัวแอดมิน</h2>
              <Input id="AdminID" className="inputbar" placeholder="Basic usage"  value={checkin.AdminID} onChange={handleInputChange} />
              {/* <input id="AdminID" type="text" className="ticket" placeholder="กรอกรหัสประจำตัวแอดมิน"  value={checkin.AdminID} onChange={handleInputChange} /> */}
            </div>
          </div>
        </div>

        <div className="checkin-butt">
          <li ><a className="confirm_butt" onClick={submit} href="">เช็คอิน</a></li>
        </div>
      </section>

      <footer>

      </footer>

      {/* check end */}
    </div>

  );
}

export default Checkin;
