import styled from 'styled-components';

import media from '../abstracts/_media';

export const remy = px => `${px / 16}rem`;
/* eslint-disable */
export const getWidth = (value) => {
  if (!value) return;

  const width = value / 12 * 100;
  return `width: ${width}%;`;
};
/* eslint-disable */
export const getFlex = (value) => {
  if (!value) return;

  const flex = value / 12 * 100;
  return `flex: 0 0 ${flex}%;`;
};

export const GridContainer = styled.div`
  padding-right: ${remy(15)};
  padding-left: ${remy(15)};
  margin-right: auto;
  margin-left: auto;
  width: 100%;

  ${media.tablet`
    max-width: ${remy(540)};
  `}

  ${media.small_desktop`
    max-width: ${remy(720)};
  `}

  ${media.medium_desktop`
    max-width: ${remy(960)};
  `}

  ${media.large_desktop`
    max-width: ${remy(1140)};
  `}
`;

export const GridRow = styled.div`
  margin-right: ${remy(-15)};
  margin-left: ${remy(-15)};
  display: flex;
  flex-wrap: wrap;
`;

export const GridColumn = styled.div`
  padding-right: ${remy(15)};
  padding-left: ${remy(15)};

  ${({ xs }) => (xs ? getFlex(xs) : 'flex: 0 0 100%')};
  ${({ xs }) => (xs ? getWidth(xs) : 'width: 100%')};

  ${media.tablet`
    ${({ sm }) => sm && getFlex(sm)};
    ${({ sm }) => sm && getWidth(sm)};
  `}

  ${media.small_desktop`
    ${({ md }) => md && getFlex(md)};
    ${({ md }) => md && getWidth(md)};
  `}

  ${media.medium_desktop`
    ${({ lg }) => lg && getFlex(lg)};
    ${({ lg }) => lg && getWidth(lg)};
  `}

  ${media.large_desktop`
    ${({ xl }) => xl && getFlex(xl)};
    ${({ xl }) => xl && getWidth(xl)};
  `}
`;
