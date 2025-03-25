import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${(props) => props.theme.fonts.body};
    color: ${(props) => props.theme.colors.gray[900]};
    background-color: ${(props) => props.theme.colors.gray[50]};
    line-height: ${(props) => props.theme.lineHeights.normal};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${(props) => props.theme.fonts.heading};
    font-weight: ${(props) => props.theme.fontWeights.semibold};
    line-height: ${(props) => props.theme.lineHeights.tight};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button, input, select, textarea {
    font-family: inherit;
  }

  button {
    cursor: pointer;
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes slideDown {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes slideLeft {
    from { transform: translateX(20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes slideRight {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Classes d'animation */
  .fadeIn { animation: fadeIn 0.5s ease forwards; }
  .slideUp { animation: slideUp 0.5s ease forwards; }
  .slideDown { animation: slideDown 0.5s ease forwards; }
  .slideLeft { animation: slideLeft 0.5s ease forwards; }
  .slideRight { animation: slideRight 0.5s ease forwards; }
  .pulse { animation: pulse 2s infinite; }
  .spin { animation: spin 1s linear infinite; }

  /* Délais d'animation */
  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }
`

export default GlobalStyles

