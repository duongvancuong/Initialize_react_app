import React from 'react';
import styled from 'styled-components';

import { SiteThemeContext } from '../../../context/SiteThemeContext';
import themes from '../../../styles/abstracts/themes';

const SelectWrapper = styled.div``;

const Select = styled.select``;

const SelectOpt = styled.option``;
/* eslint-disable */
const SiteThemeSelect = () => (
  <SiteThemeContext.Consumer>
    {({ handleThemeChange }) => (
      <SelectWrapper>
        <Select onChange={e => handleThemeChange(e)}>
          {Object.keys(themes).map((theme, index) => (
            <SelectOpt key={index} value={theme}>
              Theme {theme}
            </SelectOpt>
          ))}
        </Select>
      </SelectWrapper>
    )}
  </SiteThemeContext.Consumer>
);

export default SiteThemeSelect;
