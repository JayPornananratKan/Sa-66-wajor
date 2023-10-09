import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Checkin from './pages/checkin';
import Main from './pages/main';
import Login from './pages/login';
import ManageShow from './pages/manageShow';
import Modify from './pages/modify';
import MoviesIn from './pages/moviesin';


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/moviesin" element={<MoviesIn />} />
      <Route path="/modify" element={<Modify />} />
      <Route path="/manageShow" element={<ManageShow />} />
      <Route path="/checkin" element={<Checkin />} />
      
    </Routes>
  </Router>  
);

export default App;
