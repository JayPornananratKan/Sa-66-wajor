import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Checkin from './pages/checkin';
import Login from './pages/login';
import ManageShow from './pages/manageShow';
import Modify from './pages/modify';
import MoviesIn from './pages/moviesin';
import { BookingInterface } from './pages/interface/Ibooking';
import SeatComp from './pages/seat';
import MainAdmin from './pages/mainAdmin';
import MainUser from './pages/mainUser';
import Payment from './pages/payment';
import { PaymentInterface } from './pages/interface/Ipayment';
import TicketNumber from './pages/ticketnumber';



// const App = () => (
//   const [data,setData] = useState<BookingInterface>()

//   <Router>
//     <Routes>
//       <Route path="/" element={<Checkin />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/moviesin" element={<MoviesIn />} />
//       <Route path="/modify/:id" element={<Modify />} />
//       <Route path="/manageShow" element={<ManageShow />} />
//       <Route path="/createshowtime" element={<CreateShowTime />} />
//       <Route path="/modifyshowtime" element={<ModifyShowTime />} />
//       <Route path="/checkin" element={<Checkin />} />
//       <Route path="/showmovie" element={<Showmovie />} />
//       <Route path="/seat" element={<SeatComp setData={setData} Bookdata={data}/>} />
//     </Routes>
//   </Router>  
// );

const App = () =>{ 

  const [data,setData] = useState<BookingInterface>()

  return (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/mainUser" element={<MainUser setData={setData}/>} />
      <Route path="/mainAdmin" element={<MainAdmin setData={setData}/>} />
      <Route path="/moviesin" element={<MoviesIn />} />
      <Route path="/modify" element={<Modify />} />
      <Route path="/manageShow" element={<ManageShow />} />
      <Route path="/checkin" element={<Checkin />} />
      <Route path="/seat" element={<SeatComp setData={setData} Bookdata={data}/>} /> 
      <Route path="/payment" element={<Payment/>} />
      <Route path="/ticketnumber/:paymentID" element={<TicketNumber />} />
    </Routes>
    
  </Router>  
)};

export default App;
