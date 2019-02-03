import styled from "styled-components";

export const FooterStyle = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgb(92, 119, 206);
  color: white;
  position: fixed;
  left: 0;
  bottom: 0;

  a {
    text-decoration: none;
    color: white;
  }

  i {
    font-size: 20px;
  }

  button#openModal {
    background: 0;
    border: 0;
    padding: 0;
    color: white;
  }
`;
