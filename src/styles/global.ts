import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto Slab", Georgia;
  }

  :root {
    font-size: 62.5%;
  }

  /* Personalizando a barra de rolagem */
  ::-webkit-scrollbar {
    width: 4px; /* Largura da barra de rolagem */
  }

  /* Parte de trás da barra de rolagem */
  ::-webkit-scrollbar-track {
    background: transparent; 
  }

  /* Parte da frente da barra de rolagem */
  ::-webkit-scrollbar-thumb {
    background: ${({theme}) => theme.COLORS.ORANGE}; 
    border-radius: 2rem;
  }

  /* Parte da frente da barra de rolagem quando está sendo clicada */
  ::-webkit-scrollbar-thumb:active {
    background: #555; 
  }


  body {
    background-color: ${({ theme }) => theme && theme.COLORS.BACKGROUND_800};
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-size: 1.6rem;
    -webkit-font-smoothing: antialiased;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.COLORS.WHITE};;
  }

  input, 
  input:focus,
  button,
  button:focus {
    outline: none;
    border: none;
    font-family: "Roboto Slab", Georgia;
  }

  button, a {
    cursor: pointer;
    transition: filter 0.2s;
  }

  button:hover, a:hover {
    filter: brightness(0.9);
  }
`;
