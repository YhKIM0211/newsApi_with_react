import styled from "styled-components";
export const ShowAritcleDiv = styled.div` 
  margin: 0 auto;
  width: 800px;
a {
    text-decoration: none;
    color: inherit;
    display: flex;
    box-sizing: border-box; 
    margin-top: 30px;
  img {
    width: 200px;
    height: 200px;
    background: #E5E5E5;
    margin-right:20px;
    ovbject-fit: cover;
    border: 2px solid #5F5F5F;
  }

  div {
    small {
      font-size: 14px;
      font-weight: 600;
      line-height: 17px;
    }
    span {
      margin-left: 12px;
      color: #A5A5A5;
    }
    h2 {
      margin-top: 20px;
      font-size: 24px;
      font-weight: 800;
      line-height: 29px;
      text-align: left;
    }
    p {
      margin-top: 20px;
      font-size: 18px;
      font-weight: 500;
      line-height: 22px;
    }
  }
}
`;