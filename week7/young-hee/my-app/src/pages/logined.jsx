import React, {useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from 'react-router-dom';
import { logOut } from '../reducer/userSlice';
import styled from 'styled-components';

export const MyPageDiv = styled.div`

  margin-left: 270px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-top: 6px;
    width: 170px;
    font-size: 1.2rem;
  }
  p {
    margin-top: 6px;
    width: 170px;
    font-size: 1.2rem;
  }
  button {
    margin-top: 7px;
    width: 170px;
    font-size: 1.4rem;
  }
`;

function MyPage() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [logout, setLogout] = useState(false);

  const handleLogout = () => {
    setLogout(true);
    dispatch(logOut());
  }

  return (
      <>
      <MyPageDiv>
      {logout && <Navigate to='/'/>}
          <h1>MyPage</h1>
          <p>{user.name || ''}님, 안녕하세요!</p>
          <button 
            onClick={handleLogout}
          >
          로그아웃
          </button>
      </MyPageDiv>
        
      </>
  )
}

export default MyPage;