import React, { useEffect } from 'react';
import '../../App.css';
import './checkin.css';
import logo from "../../assets/logo.png"
import กู from "../../assets/กู.png"
import ก็กู from "../../assets/ก็กู.jpg"
import background from "../../assets/cin3.jpg"
import Navbar from '../../Navbar/navbar';
import { CheckinInterface } from '../interface/Icheckin';
import { CreateCheckin, GetTicketNumber } from '../service/httpClientService';
import { TicketNumberInterface } from '../interface/Iticketnumber';
import { Input } from 'antd';


function CheckIn() {
    const [checkin, setCheckin] = React.useState<Partial<CheckinInterface>>({
        TicketNumberID: 0,
        AdminID: 0,
    });
    const [ticketnumber, setTicketNumbers] = React.useState<TicketNumberInterface[]>([]);
    const [message, setAlertMessage] = React.useState("");
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const getTicketNumber = async () => {
        let res = await GetTicketNumber();
        if (res) {
          setTicketNumbers(res);
        }
    };

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
        const id = event.target.id as keyof typeof checkin;
    
        const { value } = event.target;
    
        setCheckin({ ...checkin, [id]: value });
      };
    useEffect(() => {

    },[]);

    async function submit() {

        const data: CheckinInterface = {
            TicketNumberID:
              typeof checkin.TicketNumberID === "string" ? parseInt(checkin.TicketNumberID): 0,
            AdminID:
              typeof checkin.AdminID === "string"? parseInt(checkin.AdminID): 0,
            Datie:
              typeof checkin.Datie === "string"? new Date(checkin.Datie): checkin.Datie ?? null,
          };
    
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
                            <Input id="Length" className="inputbar" placeholder="Basic usage" value={checkin.TicketNum} onChange={handleInputChange}/>
                                
                            <h2 >รหัสประจำตัวแอดมิน</h2>
                            <input type="text" className="ticket" placeholder="กรอกรหัสประจำตัวแอดมิน" />
                        </div>    
                    </div>  
                </div>

                <div className="checkin-butt">
                    <li ><a className= "confirm_butt" onClick={submit} href="">เช็คอิน</a></li>
                </div>
            </section>

            <footer>
                
            </footer>

            {/* check end */}
        </div>
        
    );
}

export default CheckIn;
