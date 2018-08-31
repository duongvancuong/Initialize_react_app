import { css } from 'styled-components';

const sizes = {
  large_desktop: 1200,
  medium_desktop: 992,
  small_desktop: 768,
  tablet: 576,
  phone: 376
}

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)}
    }
  `
  return accumulator;
}, {});
