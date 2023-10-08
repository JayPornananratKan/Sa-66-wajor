import { movieInterface } from "../interface/Imovie";

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


export { GetTypemovie, UpdateMovie, GetMovie, CreateMovie ,GetRate};
