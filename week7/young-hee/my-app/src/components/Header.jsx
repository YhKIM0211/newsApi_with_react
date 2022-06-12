import React, {useState} from 'react';
import {HeaderDiv} from '../style/headerStyle.js'

const Header = ({updateKeyword}) => { //App에서 가져온 {updateKeyword} 함수 플롭

  const [input, setInput] = useState("");
  const inputTab = React.useRef(null);

  const handleClick = () => {
    let finKeyword = input.trim().toUpperCase(); //대소문자 구분X, 공백제거 -> 키워드 변환

    if(finKeyword === '') { //키워드 에러 처리
      alert('검색어를 입력해주세요.');
      setInput("");//초기화 -> 없어도되는 코드일까요??
      inputTab.current.value = "";
      inputTab.current.focus();
      return ;
    }
    
    updateKeyword(finKeyword); //App에서 가져온 {updateKeyword} 함수 프롭
  }

  return (
    <>
    <HeaderDiv> 
      <nav>
        <a href="/">Home</a>
        <a href="/news">News</a>
        <a href="/Community">Community</a>
        <a href="/login">Login</a>
        <a href="/register">Sign up</a>
      </nav>
      <div className="header-input-bar">
          <input type="text" name="input-bar" required
            maxLength="" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
          />
          <button ref = {inputTab} onClick={handleClick}>Search</button>
      </div>
    </HeaderDiv>
    </>
  );
}

export default Header;