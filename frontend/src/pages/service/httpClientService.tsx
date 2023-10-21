import {  BookingInterface } from "../interface/Ibooking";

import {  PaymentInterface } from "../interface/Ipayment";

import {  movieInterface } from "../interface/Imovie";

import {  TicketNumberInterface } from "../interface/Iticketnumber";

import { MembersInterface } from "../interface/Imember";

import {  ShowtimeInterface } from "../interface/Ishowtime";

import {  TheatreInterface} from "../interface/Itheatre";
import { CheckinInterface } from "../interface/Icheckin";



const apiUrl = "http://localhost:8080";

async function GetMovie() {
  const requestOptions = {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/movies`, requestOptions)
    .then((response) => response.json())

    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
async function DeleteMovie(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE"
  };

  let res = await fetch(`${apiUrl}/movies/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
async function CreateMovie(data: movieInterface) {
  const requestOptions = {
    method: "POST",

    headers: { "Content-Type": "application/json" },

    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/movies`, requestOptions)
    .then((response) => response.json())

    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}
async function UpdateMovie(data: movieInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/movies`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        localStorage.setItem("lid", JSON.stringify(res.data));
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

async function GetTypemovie() {
  const requestOptions = {
    method: "GET",
    headers: {
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/typemovies`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetRate() {
  const requestOptions = {
    method: "GET",
    headers: {
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/rates`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetMovieById(id: Number | undefined) {
  const requestOptions = {
    method: "GET"
  };

  let res = await fetch(`${apiUrl}/movie/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

///////////////////////////////////////////////POND//////////////////////////////////////////////
async function CreateBooking(data: BookingInterface) {
  const requestOptions = {
    method: "POST",

    headers: { "Content-Type": "application/json" },

    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/bookings`, requestOptions)
    .then((response) => response.json())

    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}


async function GetMemberByID() {
  let MemberID = localStorage.getItem("MemberID");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(
    `${apiUrl}/member/${MemberID}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}     
async function GetAllSeat() {
  const requestOptions = {
    method: "GET",
    headers: {
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/seat`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}   
async function GetAllShowtime() {
  const requestOptions = {
    method: "GET",
    headers: {
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/showtime`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
} 
async function GetSeatByID() {
  let SeatID = localStorage.getItem("SeatID");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(
    `${apiUrl}/member${SeatID}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetShowtimeByID2() {
  let ShowtimeID = localStorage.getItem("ShowtimeID");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(
    `${apiUrl}/member${ShowtimeID}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}
async function GetShowtimeByID(id: Number | undefined) {
  const requestOptions = {
    method: "GET"
  };

  let res = await fetch(`${apiUrl}/showtimes/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

//////////////////////////////////////////////////Guide////////////////////////////////////////////////////////
async function GetAdmin() {
  const requestOptions = {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/admins`, requestOptions)
    .then((response) => response.json())

    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetCheckin() {
  const requestOptions = {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/checkins`, requestOptions)
    .then((response) => response.json())

    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetTicketNumber() {
  const requestOptions = {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/ticketnumbers`, requestOptions)
    .then((response) => response.json())

    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetTicketIDByTicketNum() {
  const requestOptions = {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/ticketid/:ticket_num`, requestOptions)
    .then((response) => response.json())

    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function CreateCheckin(data: CheckinInterface) {
  const requestOptions = {
    method: "POST",

    headers: { "Content-Type": "application/json" },

    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/checkins`, requestOptions)
    .then((response) => response.json())

    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

async function DeleteShowtime(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE"
  };

  let res = await fetch(`${apiUrl}/showtimes/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function CreateShowtimes(data: ShowtimeInterface) {
  const requestOptions = {
    method: "POST",

    headers: { "Content-Type": "application/json" },

    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/showtimes`, requestOptions)
    .then((response) => response.json())

    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

async function GetTheatre() {
  const requestOptions = {
    method: "GET",
    headers: {
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/theatre`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function getLastBooking() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/get_lastBooking`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function createPayment(data: PaymentInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/post_payment`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

async function createTicketNumber(data: TicketNumberInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/post_ticketNumber`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

async function getTicketNumberByID(id: number | undefined): Promise<TicketNumberInterface | null> {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(`${apiUrl}/ticketnumber/${id}`, requestOptions);
    if (response.status === 200) {
      const data = await response.json();
      return data.data; // ส่งข้อมูลการจองกลับ
    } else {
      // กระบวนการล้มเหลว
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลการจอง:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการส่งคำขอ:", error);
    return null;
  }
}

async function UpdateShowtime(data: ShowtimeInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/showtimes`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        localStorage.setItem("lid", JSON.stringify(res.data));
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

export {
    CreateBooking, GetMemberByID, GetAllSeat,
    GetAllShowtime, GetSeatByID, GetShowtimeByID,
    GetTypemovie, UpdateMovie, GetMovie,
    CreateMovie, GetRate, GetAdmin,
    GetTicketNumber, GetTicketIDByTicketNum, GetCheckin,
    CreateCheckin, DeleteMovie, GetMovieById, 
    CreateShowtimes, GetTheatre, DeleteShowtime,
    getLastBooking, createPayment, createTicketNumber,
    getTicketNumberByID, UpdateShowtime, GetShowtimeByID2
};
