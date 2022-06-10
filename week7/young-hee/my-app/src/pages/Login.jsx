import React, { useState } from'react';
import { LoginDiv } from '../style/loginStyle';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux'; //hock
import { logIn } from '../reducer/userSlice';
import { logOut } from '../reducer/userSlice';

const Login = () => {
  //const user = useSelector((state) => state.user.initialValue);
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const [logout, setLogout] = useState(false);
  const [userId,setUserId] = useState("");
  const [userPswd, setUserPswd ] = useState("");
  const [msg, setMsg] = useState("");
  
  const handleLogin = async (e) => {
    e.preventDefault();
    //const emailRgexp = /^([A-Za-z0-9_\.\-]+)@([A-Za-z0-9\-]+)(\.[A-Za-z0-9\-]+){1,2}$/; 
    
    if (!(userId && userPswd)) {
      return setMsg('ID와 PASSWORD를 입력해주세요');
    }
    
    // if (emailRgexp.test(userId) !== true) {
    //   return setMsg('id는 정상적인 이메일 형식이어야 합니다.');
    // }
    //매니저님이 열어주신 서버로 작업을 해서 현재는 조건을 걸지 않음

    // if (userPswd.length < 4 ) {
    //   return setMsg('password는 4자리 이상이어야 합니다.');
    // }

    setLogin(true);

    let body = {
      id : userId,
      password : userPswd
    }

    await axios.post('https://st-fe34.herokuapp.com/api/user/login', body)
    .then((res) => {
      console.log(body);
      console.log(res);
      switch (res.data.code) {
        case 400:
            setMsg('ID와 PW를 입력해주세요');
            break;
        case 401:
            setMsg('존재하지 않는 ID 입니다');
            break;
        case 402:
            setMsg('비밀번호가 틀렸습니다');
            break;
        default:
            alert('로그인 완료');
            dispatch(logIn(res.data.userInfo));
            console.log(res.data.userInfo);
      }
    }) .catch((err) => {
      console.log(err);
      setMsg("예상치 못한 오류가 발생했습니다. 다시 시도해주세요.")
    });
  }

  const handleLogout = () => {
    setLogout(true);
    dispatch(logOut());
  }

  return (
    <>
    <LoginDiv>
    { login && <Navigate to="/"/>}
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
          disabled={false}
          onClick={handleLogin}
        >
        Login
        </button>
        <Link to="/">
          <button
            type="submit" 
            disabled={false}
            onClick={handleLogout}
          >
          Logout
          </button>
        </Link>
        <br />
        {msg}
        <Link to="/signUp"><button>회원 가입하기</button></Link>
      </form>
    </LoginDiv>
    </>
  )
}

export default Login;
