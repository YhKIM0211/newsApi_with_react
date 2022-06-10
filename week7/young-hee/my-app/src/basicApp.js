// import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Aside from './components/Aside.jsx'
import Header from './components/Header.jsx'
import News from './components/News.jsx';

function App () {
  const [keyword, setKeyword] = useState(""); //부모 컴포넌트에 필요한 공용 프롭을 정의하고 자식으로 전달해준다.

  return (
    <div className='App'>
        <Aside />
      <div className="wrapper">
        <Header updateKeyword = {setKeyword}/> 
        <News newskeyword={keyword}/>
      </div>
    </div>
  );
}


export default App;
