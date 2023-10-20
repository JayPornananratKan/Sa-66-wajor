import React, { useEffect, useState } from "react";
import {
  DatePicker,
  TimePicker,
  Input,
  Button,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Col, Divider, Row, message } from "antd";
import { useNavigate } from "react-router-dom";
import type { DatePickerProps } from "antd";

import background from "../../assets/cin3.jpg";
import qr from "../../assets/QR.jpg";
import krungthai from "../../assets/krungthai.png";
import kbank from "../../assets/kbank.png";
import NavBar from "../../Navbar/navbarUser";

import {
  createPayment,
  createTicketNumber,
  getLastBooking,
} from "../service/httpClientService";
import { PaymentInterface } from "../interface/Ipayment";
import FormItem from "antd/es/form/FormItem";
import { BookingInterface } from "../interface/Ibooking";
import { TicketNumberInterface } from "../interface/Iticketnumber";
import { TypeSeatInterface } from "../interface/Itypeseat";
import './payment.css';
import '../../App.css';
import NavbarUser from "../../Navbar/navbarUser";



const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};

const props: UploadProps = {
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange({ file, fileList }) {
    if (file.status !== "uploading") {
      console.log(file, fileList);
    }
  },
};



function Payment() {
  const [bookingID, setBookingID] = useState(0);

  const [booking, setBooking] = useState<BookingInterface[]>([]);
  const [payment, setPayment] = useState<Partial<PaymentInterface>>({});
  const [message, setAlertMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [file, setFile] = useState(null);

  const [seatNum, setSeatNum] = useState("");

  const [billPhoto, setBillPhoto] = useState("");
  const [compareResult, setCompareResult] = useState<string>("");

  const [alertVisible, setAlertVisible] = useState(false);

  const [price, setPrice] = useState<number | null>(null); // กำหนดค่าเริ่มต้นของ price เป็น null
  const navigate = useNavigate();

  async function GetLastBooking() {
    const data = await getLastBooking();
    setPrice(data.Seat.TypeSeat.Price);
    setSeatNum(data.Seat.Seatnum);
  }

  useEffect(() => {
    GetLastBooking();
  }, []);

  const props: UploadProps = {
    beforeUpload: (file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          const base64Image = e.target.result as string; // Ensure it's a string
          // นำ base64Image ไปใช้ในการบันทึกรูปภาพลงใน entity
          setBillPhoto(base64Image); // ตั้งค่า state สำหรับเก็บรูปภาพ
        }
      };

      reader.readAsDataURL(file);
      return false; // Prevent automatic upload
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Payment;

    const { value } = event.target;

    setPayment({ ...payment, [id]: value });
  };

  async function submit() {
    const amountValue =
      typeof payment.Amount === "string" ? parseInt(payment.Amount) : 0;

    if (amountValue != price) {
      setCompareResult("จำนวนเงินไม่เพียงพอ"); // ราคาไม่เพียงพอ
      return; // ไม่ดำเนินการต่อ
    } else {
      let data = {
        Amount:
          typeof payment.Amount === "string" ? parseInt(payment.Amount) : 0, // Ensure Length is a number
        Datie: date,
        Bill: billPhoto, // รูปภาพที่ได้จากการอัปโหลด
      };

      let res = await createPayment(data);
      const paymentID = res.message.ID;


      if (res.status) {
        setAlertMessage("บันทึกข้อมูลสำเร็จ");
        setSuccess(true);

        setTimeout(function () {
          navigate(`/ticketnumber/${paymentID}`);
        }, 2000);

        const ticketNumber = generateRandomString(13); // สร้างสตริงสุ่ม 13 ตัว
        const ticketData: TicketNumberInterface = {
          PaymentID: res.message.ID, // ใช้ ID ของ Payment ที่สร้างเพิ่งแรก
          TicketNum: ticketNumber,
        };

        // เรียกฟังก์ชันสร้าง TicketNumber
        let ticketRes = await createTicketNumber(ticketData);
        if (ticketRes.status) {
          setAlertMessage("บันทึกข้อมูลสำเร็จ");
          setSuccess(true);
        } else {
          setAlertMessage(ticketRes.message);
          setError(true);
        }
      } else {
        setAlertMessage(res.message);
        setError(true);
      }
    }
  }

  const handleDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    if (date) {
      setDate(date.toDate());
    }
  };

  // ฟังก์ชันสร้างสตริงสุ่ม
  function generateRandomString(length: number): string {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const [loading, setLoading] = useState(false);
  const onButtonClick = (e: any) => {
    console.log("Button clicked");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <div>
      <nav>
        <NavbarUser />
      </nav>

      <section className="background">
        <li><img src={background} alt="" /></li>
      </section>

      <label className="payment">ชำระเงิน</label>

      <section className="content">
        <label className="amount">
          ราคาที่ต้องชำระเงินทั้งหมด: {price} , ที่นั่ง: {seatNum}
        </label>

        <div className="block1">
          <div className="form-group1">
            <label>ราคา:</label>

            <Input
              id="Amount"
              className="input1"
              placeholder="จำนวนเงิน"
              value={payment.Amount}
              onChange={handleInputChange}
              allowClear
            ></Input>
          </div>

          {/* DatePicker for selecting date */}
          <div className="form-group2">
            <label>เลือกวันเวลา:</label>
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              onChange={handleDateChange}
              className="input2"
              id="date"
              showTime
            />
          </div>
        </div>

        <div className="qr-pic">
          <img src={qr} alt="" />
        </div>

        <div className="krungthai-pic">
          <img src={krungthai} alt="" />
          <label className="bankname1">Wajor 012-1-61744-0</label>
        </div>

        <div className="kbank-pic">
          <img src={kbank} alt="" />
          <label className="bankname2">Wajor 030-2-22535-4</label>
        </div>
      </section>
      {/* </Form> */}

      <div className="upload">
        <label>อัพโหลดหลักฐานการโอน:</label>
        <Upload {...props} action="/post_payment">
          <Button className="input" icon={<UploadOutlined />}>
            Upload
          </Button>
        </Upload>
      </div>

      {/* <section className="background">
        <div className="adverse-blog">
          <img src={background} alt="" />
        </div>
      </section> */}

      <section>
        <Button className="confirm-button" onClick={submit} loading={loading}>
          ยืนยัน
        </Button>
      </section>
    </div>
  );
}

export default Payment;
