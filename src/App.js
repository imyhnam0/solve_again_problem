import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from './components/Login';
import Signup from './components/Signup';
import Savetitle from './components/Savetitle';
import TitlePage from "./components/TitlePage";




function App() {  
  
   return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Savetitle />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/savetitle" element={<Savetitle />} />
          <Route path="/page/:titleId" element={<TitlePage />} />
          
        </Routes>
      </BrowserRouter>
    </div>
   
  );
  
}

export default App;