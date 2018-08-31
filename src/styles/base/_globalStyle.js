import { injectGlobal } from 'styled-components';
import { colors, font } from '../abstracts/variables.json';
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Pacifico');

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    outline: none;
  }

  html {
    font-size: 62.5%;
    box-sizing: border-box;
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: ${font.font_family};
    font-size: ${font.size.base};
    padding: 0;
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  div,
  section {
    padding: 0;
    margin: 0;
  }

  ul,
  ol,
  li {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  p,
  div {
    font-size: 1.5rem;
    line-height: 1.5;
  }

  button,
  input[type="button"],
  input[type="reset"],
  input[type="submit"] {
    border-radius: 0;
    border: none;
    cursor: pointer;
  }

  input,
  textarea {
    &::placeholder {
      opacity: 0.4;
    }
  }

  textarea {
    line-height: 1.5;
    overflow: auto;
    resize: vertical;
  }

  button,
  html [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }

  a {
    color: ${colors.link};
  }
`
