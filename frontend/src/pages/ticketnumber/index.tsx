import React, { SetStateAction, useEffect, useState } from "react";
import NavBar from "../../Navbar/navbar";
import { useParams } from "react-router-dom";
import { getTicketNumberByID } from "../service/httpClientService";
import { PaymentInterface } from "../interface/Ipayment";
import '../payment/payment.css';
import '../../App.css';
import background from '../../assets/cin3.jpg'
import NavbarUser from "../../Navbar/navbarUser";



function TicketNumber() {
  const { paymentID } = useParams();
  // ดำเนินการใด ๆ ที่คุณต้องการด้วยค่า paymentID
  let paymentIDNumber: number | undefined;
  // ตรวจสอบว่า paymentID ไม่เป็น undefined ก่อนที่จะแปลงเป็นตัวเลข
  if (paymentID !== undefined) {
    paymentIDNumber = parseInt(paymentID, 10); // แปลงเป็น number
  } else {
    // คุณสามารถจัดการกับสถานการณ์ที่ paymentID เป็น undefined ได้ที่นี่
    console.error("paymentID is undefined");
  }

  const [ticketNumber, setTicketNumber] = useState<string>("");

  async function GetTicketNumber() {
    console.log(paymentIDNumber);

    const data = await getTicketNumberByID(paymentIDNumber);
    if (typeof data === "string" || data === null) {
      setTicketNumber(data || "Data not found"); // Use data or "Data not found" if data is null
    } else {
      console.error("Invalid data type for ticketNumber");
    }

    console.log(data);
  }

  useEffect(() => {
    GetTicketNumber();
  }, []);

  return (
    <div>
      <nav>
        <NavbarUser />
      </nav>

      <section className="background">
        <li><img src={background} alt="" /></li>
      </section>
      <section className="background">
        <li><img src={background} alt="" /></li>
      </section>

      <section className="content">
        <label className="booking-number">หมายเลขการจอง</label>
        <label className="number">
          {ticketNumber ? ticketNumber : "Data not found"}
        </label>
      </section>

    </div>
  );
}

export default TicketNumber;