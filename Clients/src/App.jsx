import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Login from './Login/Login';
import Home from './Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  
  return (
  //  <div>
  //     <Login/>
  //  </div>
   <Router>
      <Routes>
        <Route path='/Home' element={<Home/>} />
        <Route path='/' element={<Login/>} />
      </Routes>
   </Router>
  );
}

export default App;
