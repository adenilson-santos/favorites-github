import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  /* background:black; */
  align-items: center;
  margin: 20px 0;

  form {
    width: 100%;
    max-width: 450px;
    display:flex;
    margin: 10px;

    input {
      flex: 1;
      height: 30px;
      margin-right: 5px;
      color: #333;
      padding: 0 15px;
      border: 0;
    }

    button {
      width: 40px;
      height: 30px;
      background: rgb(92, 119, 206);
      color: white;
      border: 0;
    }
 }
`;
