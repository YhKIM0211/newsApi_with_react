import React, { useState } from'react';
import { LoginDiv } from '../style/loginStyle';

import axios from 'axios';
import { useDispatch } from 'react-redux'; //hock
import { logIn } from '../reducer/userSlice';

import { Navigate } from 'react-router-dom';
import { Link } from "react-router-dom"

const Login = () => {
  const dispatch = useDispatch();
  
  const [userId,setUserId] = useState("");
  const [userPswd, setUserPswd ] = useState("");
  const [login, setLogin] = useState(false);
  const [msg, setMsg] = useState("");
  
  const handleLogin = async (e) => {
    e.preventDefault();

    const emailRgexp = /^([A-Za-z0-9_\.\-]+)@([A-Za-z0-9\-]+)(\.[A-Za-z0-9\-]+){1,2}$/; 
    if (!emailRgexp.test(userId)) {
      return setMsg('id는 정상적인 이메일 형식이어야 합니다.');
    }

    let body = {
      id : userId,
      password : userPswd
    }

    try {
      let res = await axios.post('https://st-fe34.herokuapp.com/api/user/login', body)
      console.log(body);
      console.log(res);

      switch (res.data.code) {
        case 401:
            setMsg('존재하지 않는 ID 입니다');
            break;
        case 402:
            setMsg('비밀번호가 틀렸습니다');
            break;
        default:
            alert('로그인 성공');
            setLogin(true);
            dispatch(logIn({...res.data.userInfo, loginState : true }));
            console.log("res.data.userInfo",res.data.userInfo);
      }
    } catch(e) {
      console.log(e);
      setMsg("오류가 발생했습니다. 다시 시도해주세요.")
    }
  }

  
  return (
    <>
    <LoginDiv>
    { login && <Navigate to="/mypage" />}
      <form action="" method="" className="login">
        <label htmlFor="id">Id: </label>
        <input type="text" name="id" 
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" 
          value={userPswd}
          onChange={(e) => setUserPswd(e.target.value)}
        />
        <button
          type="submit" 
          disabled={!(userId && userPswd)}
          onClick={handleLogin}
        >
        Login
        </button>
        <br />
        {msg}
        <hr />
        <Link to="/register"><button>회원 가입하기</button></Link>
      </form>      
    </LoginDiv>
    </>
  )
}

export default Login;
