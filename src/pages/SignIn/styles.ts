import styled from "styled-components";
import backgroundImg from "../../assets/signin.jpg";


export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`

export const Form = styled.form`
  padding: 0 16rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  > h1 {
    font-size: 4.8rem;
    color: ${({theme}) => theme.COLORS.ORANGE};
  }

  > h2 {
    font-size: 2.4rem;
    margin: 2.8rem 0;
  }

  > p {
    font-size: 1.4rem;
    color: ${({theme}) => theme.COLORS.GRAY_100};
  }

  > a {
    margin-top: 12.4rem;
    color: ${({theme}) => theme.COLORS.ORANGE};
  }
`

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImg}) no-repeat center center;
  background-size: cover;
`