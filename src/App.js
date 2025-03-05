import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from './components/Login';
import Signup from './components/Signup';
import Savetitle from './components/Savetitle';
import TitlePage from "./components/TitlePage";
import Probelms from './components/Problems';




function App() {  
  
   return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Probelms />} />
          <Route path="/signup" element={<Signup />} /> {/* 회원가입 */}
          <Route path="/login" element={<Login />} /> {/* 로그인 */}
          <Route path="/savetitle" element={<Savetitle />} /> {/* 문제집 생성 */}
          <Route path="/page/:titleId" element={<TitlePage />} /> {/* 문제 */}
          <Route path="/problem/:name" element={<Probelms />} />  {/* 문제의 내용 */} 
          
        </Routes>
      </BrowserRouter>
    </div>
   
  );
  
}

export default App;