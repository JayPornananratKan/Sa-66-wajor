import React, { useEffect, useState } from 'react';
import '../../App.css';
import './checkin.css';
import background from "../../assets/cin3.jpg"
import Navbar from '../../Navbar/navbar';
import { CheckinInterface } from '../interface/Icheckin';
import { TicketNumberInterface } from '../interface/Iticketnumber';
import { Input } from 'antd';
import { AdminsInterface } from '../interface/Iadmin';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import {
  GetAdmin,
  GetTicketNumber,
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
  const [checkins, setCheckins] = useState<CheckinInterface[]>([]);
  const [ticketNum, setTicketNum] = useState("");
  const [checkin, setCheckin] = useState<Partial<CheckinInterface>>({});
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

  async function submit() {
    const selectedTicketNumber = ticketnumbers.find((ticket) => ticket.TicketNum === ticketNum);
    const currentTimestamp = Date.now();
    const currentDate = new Date(currentTimestamp);
  
    if (!selectedTicketNumber) {
      setAlertMessage("ไม่พบหมายเลขตั๋ว");
      setError(true);
      return;
    }

    if (selectedTicketNumber.Status === "Checked") {
      setAlertMessage("หมายเลขตั๋วนี้เช็คอินไปแล้ว");
      setError(true);
      return;
    }

    let data = {
      TicketNumberID: selectedTicketNumber?.ID,
      //  typeof checkin.TicketNumberID === "string" ? parseInt(checkin.TicketNumberID) : checkin.TicketNumberID,
      AdminID: 
       typeof checkin.AdminID === "string" ? parseInt(checkin.AdminID) : checkin.AdminID,
      Datie: currentDate,
    };

    let res = await CreateCheckin(data);

    if (res.status) {

        setAlertMessage("เช็คอินสำเร็จ");
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
        autoHideDuration={12000}
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
        autoHideDuration={12000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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
              <Input id="TicketNum" className="inputbar1" placeholder="กรอกรหัสตั๋ว"  value={ticketNum} onChange={(e) => setTicketNum(e.target.value)} />

              <h2 >รหัสประจำตัวแอดมิน</h2>
              <Input id="AdminID" className="inputbar1" placeholder="กรอก ID ของ Admin"  value={checkin.AdminID} onChange={handleInputChange} />
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
