import {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: ${({theme}) => theme.fonts.body};
    background-color: ${({theme}) => theme.colors.gray[50]};
    color: ${({theme}) => theme.colors.gray[900]};
    line-height: 1.5;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input, select, textarea {
    font-family: inherit;
  }
`;
