import { createGlobalStyle } from "styled-components";

import "@fortawesome/fontawesome-free/css/all.css";

const GlobalStyle = createGlobalStyle`
  * {
        padding: 0; margin: 0;
        box-sizing: border-box;
        outline: 0;
        -webkit-hyphens: auto;
        -moz-hyphens: auto;
        -ms-hyphens: auto;
        hyphens: auto;
    }
    body {
        text-rendering: optimizeLegibility !important;
        -webkit-font-smoothing: antialiased !important;
        background: rgb(233, 236, 240);
        font-family: Arial, Helvetica, sans-serif;
        margin-bottom: 50px;
    }

    #root {
        display: flex;
        flex-direction:column;
        align-items:center;
    }
`;

export default GlobalStyle;
