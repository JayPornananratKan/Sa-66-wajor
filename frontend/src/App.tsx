import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Checkin from './pages/checkin';
import Main from './pages/main';
import Login from './pages/login';
import ManageShow from './pages/manageShow';
import Modify from './pages/modify';
import MoviesIn from './pages/moviesin';
import Showmovie from './pages/showmovie';


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Checkin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/moviesin" element={<MoviesIn />} />
      <Route path="/modify/:id" element={<Modify />} />
      <Route path="/manageShow" element={<ManageShow />} />
      <Route path="/checkin" element={<Checkin />} />
      <Route path="/showmovie" element={<Showmovie />} />
    </Routes>
  </Router>  
);

export default App;
