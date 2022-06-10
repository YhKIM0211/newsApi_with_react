import React from'react';
import styled from 'styled-components';

const CommunityStyle = styled.div`
  margin: 0 auto;
  margin-top : 300px;
  margin-left : 300px;
  color : green;
  h1 {display: block}
`;

const Community = () => {
  return (
    <>
    <CommunityStyle>
      <h1>THis is a Community</h1>
    </CommunityStyle>
    </>
  )
}

export default Community;