import styled from "styled-components"

export const AsideDiv = styled.div`
  width: 240px; 
  height: 100%;
  background-color: #E5E5E5;
  border: 2px solid #5F5F5F;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top:0px;
  left:0px;  

  .newspage-title {
    margin: 0 auto;
    margin-top:26px;

    h1 {
      margin-bottom: 36.16px; 
      font-weight: 900;
      font-size: 60px;
      line-height: 72px;
    }

    p {
      display: block;
      width: 145px; /*박스요소 변환후 가로 너비만 고정*/
      font-weight: 600;
      font-size: 18px;
      line-height: 22px;
    }
  }

  button {
    width: 172px;
    height: 38px;
    background: #FFFFFF;
    border-radius: 4px;
    border: 2px solid #5F5F5F;
    
    margin: 0 auto;
    margin-top: auto;
    margin-bottom: 47px;
  
    text-align: center;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
  }
  
`;