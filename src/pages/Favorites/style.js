import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
  flex-wrap: wrap;
`;

export const Favorite = styled.div`
  width: 250px;
  background: white;
  padding: 10px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 10px;
  position: relative;

  small {
    color: #666;
  }
  header {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    margin-bottom: 20px;
  }
  img {
    width: 70px;
    margin-bottom: 5px;
    border-radius: 3px;
  }
  ul {
    list-style: none;
    li {
      margin-bottom: 5px;
      padding: 10px;
      &:last-child {
        margin: 0;
      }
      &:nth-child(odd) {
        background: rgb(240, 243, 247);
      }
    }
  }
  button,
  a {
    position: absolute;
    width: 30px;
    height: 30px;
    color: white;
    border: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .update {
    right: 3px;
    top: 3px;
    background: rgb(105, 192, 34);
  }
  .delete {
    right: 3px;
    top: 36px;
    background: rgb(236, 54, 8);
  }
  .link {
    color:dodgerblue;
    left: 3px;
    top: 3px;
  }
`;
