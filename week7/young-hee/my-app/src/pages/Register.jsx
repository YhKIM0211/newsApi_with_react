import React, { useState, useEffect } from 'react';
import { RegisterDiv } from '../style/registerStyle';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

//입력 id 유효성 검사
const checkIdValid = async (id) => {
  const emailRgexp = /^([A-Za-z0-9_\.\-]+)@([A-Za-z0-9\-]+)(\.[A-Za-z0-9\-]+){1,2}$/; 
  //올바른 형식인 경우
  if (emailRgexp.test(id) === true) {
    //입력 id 중복 검사 -> axios 서버 통신
    let body = {
      id,
    }

    await axios.post('https://st-fe34.herokuapp.com/api/user/idCheck', body)
    .then((res) => {
      console.log("res",res);
      if(res.data.check === true) {
        return 200;
      }

      if(res.data.check === false) {
        return 401; //중복
      }

    })
  }
  return 402;
};

const checkPasswordValid = (password) => {
  return (password.length >= 4);
};

const checkConfirmPasswordValid = (password, confirmPswd) => {
    return (password === confirmPswd);
}

const Register = () => {
  const [id , setId] =useState("");
  const [password, setPassword] = useState("");
  const [confirmPswd, setConfirmPswd] = useState("");

  const [register, setRegister] = useState(false);

  const [idMsg, setIdMsg] = useState("");
  const [pswdMsg, setPswdMsg] = useState("");
  const [confirmMsg, setConfirmMsg] = useState("");

  const [idButtonState,setIdButtonState] = useState(false);//클릭 가능 상태

  const idRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const confirmPswdRef = React.useRef(null);

  //유효성 검사 값
  let isValidId = checkIdValid(id);
  let isValidPassword = checkPasswordValid (password);
  let isValidConfirmPassword = checkConfirmPasswordValid (password, confirmPswd);

  //메세지를 2초간 출력 == 메세지 출력 후 3초후 삭제
  useEffect( () => {
    setTimeout( () => {
        setIdMsg('');
        setPswdMsg('');
        setConfirmMsg('');
      }, 2000);
  },[idMsg, pswdMsg, confirmMsg]);

  const handleId = (e) => {
    setId(e.target.value);
    setIdButtonState(false); 
  } 

  const handleSubmitId = (e) => { //버튼을 눌러 id의 유효성을 검사하는 함수 
    e.preventDefault(); //form submit 동작x

    //console.log("v",);

    //잘못된 경우
    if (isValidId === 401) { 
      setIdMsg('중복된 id입니다.');
      setId('');
      idRef.current.focus(); 
      setIdButtonState(false);
      return ;
    } 

    if (isValidId === 402) { 
      setIdMsg('id는 email형식이어야 합니다.');
      setId('');
      idRef.current.focus(); 
      setIdButtonState(false);
      return ;
    } 

    if (isValidId === 200) {
      setIdMsg('사용 가능한 id 입니다.');
      setIdButtonState(true);
    } 
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if( isValidId === 401 || isValidId === 402 ) {
      setIdMsg('id 확인이 필요합니다.');
      return ;
    }

    if (!isValidPassword) {
      setPswdMsg('password 확인이 필요합니다.');
      setPassword('');
      passwordRef.current=''
      passwordRef.current.focus();
      return ;
    }

    if (!isValidConfirmPassword) {
      setConfirmMsg('confirm password 확인이 필요합니다.');
      setConfirmPswd('');
      confirmPswdRef.current=''
      confirmPswdRef.current.focus(); 
    }
    
    if(isValidId === 200 && isValidPassword && isValidConfirmPassword) {
      setRegister(true);
      alert('로그인 성공!');
    }
  }

  return (
    <>
    <RegisterDiv>
    { register && <Navigate to="/login"/>}
      <form action="" method="" className="register">
        <label htmlFor="id">Id: </label>
        <input type="text" name ="id" id="id" 
          required 
          ref={idRef}
          placeholder='ex)abc@gmail.com'
          value={id} 
          onChange={handleId}
        />
        <button
          disabled={idButtonState} 
          value={id}
          onClick = {handleSubmitId}
        >
        아이디 확인
        </button>
        
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password"
          required 
          placeholder='4글자 이상'
          ref={passwordRef}
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="confirmPswd">Confirm: </label>
        <input  type="password" name="confirmPswd" id="confirmPswd"
          required
          ref={confirmPswdRef}
          value={confirmPswd} 
          onChange={(e) => setConfirmPswd(e.target.value)} 
        />
        <button type="submit" 
          onClick={handleSubmit} 
          disabled={false}
        >
        회원가입
        </button>
        <br />
        { idMsg }
        { !checkPasswordValid(password) && pswdMsg }
        { !checkConfirmPasswordValid(password,confirmPswd) && confirmMsg }
      </form>
    </RegisterDiv>
    </>
  );
};

export default Register;