import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  margin-top: 20px;
  flex-wrap: wrap;

  section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }

  .head {
    display: flex;
    flex-direction: row;
    justify-content:center;
    padding: 10px;
    max-width: 90%;
    background: white;
    border-radius: 3px;
    flex-wrap: wrap;

    img {
      max-width: 80px;
      max-height: 80px;
      margin-right: 10px;
    }

    div{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 10px;

      small {
        color: #666;
      }
    }

    .user_info {
      background: rgb(240, 243, 247);
      padding: 5px;
      border-radius: 3px;
    }
  }
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
  flex-wrap: wrap;

  small {
    color: #666;
  }

  header {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
    padding: 0 20px;
  }

  img {
    width: 70px;
    margin-bottom: 5px;
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

  button{
    position: absolute;
    width: 30px;
    height: 30px;
    border: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 3px;
    top: 3px;
    background: rgb(240, 243, 247);
    border-radius: 3px;
  }
  a {
    position: absolute;
    width: 30px;
    height: 30px;
    color: dodgerblue;
    border: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .link {
    left: 3px;
    top: 3px;
    /* background: dodgerblue; */
  }
`;
