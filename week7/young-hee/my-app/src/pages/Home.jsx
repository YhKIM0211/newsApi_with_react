import React from'react';
import styled from 'styled-components';

const HomeStyle = styled.div`
  margin: 0 auto;
  margin-top : 300px;
  margin-left : 300px;
  color : orange;
  h1 {display: block;}
`;

const Home = () => {
  return (
    <>
    <HomeStyle>
      <h1>THis is a Home</h1>
    </HomeStyle>
    </>
  )
}

export default Home;