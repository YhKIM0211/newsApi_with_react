import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';

import Aside from './components/Aside.jsx';
import Header from './components/Header.jsx'; 
import Register from './pages/Register';
import Login from './pages/Login';
import MyPage from './pages/logined'
import Home from './pages/Home';
import Community from './pages/Community';
import News from './pages/News.jsx';


function App () {
  const [keyword, setKeyword] = useState(""); 
  //부모 컴포넌트에 필요한 공용 프롭을 정의하고 자식으로 전달해준다.
  //prop drilling으로 검색 keyword 전달 및 업데이트
  return (
    <div className='App'>
      <BrowserRouter basename='/'>
        <Aside />
        <div className="wrapper">
          <Header updateKeyword = {setKeyword}/> 
          <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/news" element={<News newskeyword={keyword}/>} />
          <Route path="/community" element={<Community/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="*" element={<Navigate to ='/' replace={true}/>} />
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}


export default App;
