import styled from "styled-components"

export const HeaderDiv = styled.div`
width: calc(100vw - 240px);
margin-left: 240px;

height: 100px;
border: 2px solid #5F5F5F;
border-left: none;
background-color: #E5E5E5; 

display: flex;
justify-content: space-between;
align-items: center;


nav {
  margin-left: 42px;
  height: 38px;

  a {
    color: inherit;
    margin-right: 46px;
    text-decoration: none;
    font-size: 18px;
    font-weight: 600;
    line-height: 22px;
    text-align: left;
  }
}

.header-input-bar {
  margin-right: 32px;
  display: flex;

  input {
    width: 304px;
    height: 38px;
    margin-right: 12px;
  }
  
  button {
    width: 81px;
    height: 38px;
  
    background: #FFFFFF;
    border: 2px solid #5F5F5F;
    border-radius: 4px;
  
    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
  }

} 
`