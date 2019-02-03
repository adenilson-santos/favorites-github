import styled from 'styled-components';

export const NavStyle = styled.header`
    width: 100%;
    color: white;
    height: 50px;
    background: rgb(92, 119, 206);
    display: flex;
    justify-content:center;
    align-items: center;
    margin-bottom: 10px;
`;

export const Icons = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  width: 100%;

  p {
    margin-right: 10px;
  }

  .color{
    color: #666;
    /* animation: colors 0.5s ease infinite; */
  }

  @keyframes colors {
    0% {
      color: red;
    }

    100% {
      color: blue;
    }
  }
`;
