import React, { useState, useEffect } from 'react';
import { RegisterDiv } from '../style/registerStyle';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Register = () => {
  const [id , setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPswd, setConfirmPswd] = useState("");
  
  const [validId, setValidId] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  
  const [idButtonState,setIdButtonState] = useState(false); 
  const [register, setRegister] = useState(false);
  const [msg, setMsg] = useState("");
  
  const idRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  
  
  //메세지를 2초간 출력 == 메세지 출력 후 3초후 삭제
  useEffect( () => {
    setTimeout( () => {
        setMsg('');
      }, 2000);
  },[msg]);

  
  const handleId = (e) => {
    setId(e.target.value);
    setIdButtonState(false); //입력 받는 중이라면 id 확인 버튼 활성화
  } 

  const checkIdValid = async (e) => {
    e.preventDefault(); 
    const emailRgexp = /^([A-Za-z0-9_\.\-]+)@([A-Za-z0-9\-]+)(\.[A-Za-z0-9\-]+){1,2}$/; 
    
    if (emailRgexp.test(id)) {
      let body = {
        id,
      }
      console.log(body);
      try {
        let res = await axios.post("https://st-fe34.herokuapp.com/api/user/idCheck", body);
        console.log(res.data.check);
        
        if(res.data.check) {
          setValidId(true);
          setMsg('사용 가능한 id입니다.');
          setIdButtonState(true);
          return;
        } else {
          setValidId(false);
          setMsg('중복된 id입니다.');
          setId('');
          idRef.current.focus(); 
          return;
        }
      } catch (e) {
        console.log(e);
      }
      
    }else {
      setValidId(false);
      setMsg('유효하지 않은 id 형식입니다.')
      setId('');
      idRef.current.focus(); 
      return;
    }

  };


  const checkPasswordValid = (password, confirmPswd) => {
    if (password.length >= 4) {
      if (password === confirmPswd) {
        setValidPassword(true);
        console.log(validPassword);
        return true;
      }
    } else {
      setValidPassword(false);
      return false;
    } 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if( !validId ) {
      setMsg('id 확인이 필요합니다.');
      return ;
    }

    let pswdCheck = checkPasswordValid(password, confirmPswd);
    //console.log(validPassword); 업데이트 느림
    if (!pswdCheck) {
      setMsg('비밀번호를 확인해주세요.');
      setPassword('');
      passwordRef.current.focus();
      return ;
    }

    if( validId && pswdCheck) { //console.log(validPassword); 업데이트 느림 -함수 리턴값 활용
      const name = 'hi';
      const body = { id, name, password }

      try {
        let res = await axios.post('https://st-fe34.herokuapp.com/api/user/register' ,body)
        //console.log(res);
        //console.log(body);
        if (res.data.code === 200) {
          setRegister(true);
          alert('회원 가입 완료');
        }
      } catch (e) {
        console.log(e);
      }
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
          onClick = {checkIdValid}
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
        { !validPassword && msg }
      </form>
    </RegisterDiv>
    </>
  );
};

export default Register;