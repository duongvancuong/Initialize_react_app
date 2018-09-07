import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';


import { GridContainer, GridColumn, GridRow } from '../../../styles/layout/_grid';
import media from '../../../styles/abstracts/_media';

const Wrapper = styled.div`
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
background: ${props => props.theme.colors.blue};
`;
const MenuItem = styled(Link)`
  color: ${props => (props.active ? props.theme.colors.white : props.theme.colors.black)};
  padding: 20px 0;
  font-size: 18px;
  line-height: 25px;
  margin: 0 20px;

  &:hover {
    text-decoration: none;
    color: ${props => props.theme.colors.white};
  }
`;
const Logo = styled(Link)`
  font-size: 25px;
  font-weight: bold;
`;
const LogoImage = styled.img`
  height: 50px;
  width: 100px;
`;
const GridColumnLogo = styled(GridColumn)`
  display: flex;
  ${media.tablet`
    justify-content: center;
  `}
  ${media.phone`
    justify-content: center;
  `}
  ${media.medium_desktop`
    justify-content: center;
  `}
`;
const GridColumnRight = styled(GridColumn)`
  display: flex;
  align-items: center;
  ${media.tablet`
    justify-content: space-around;
  `}
  ${media.phone`
    justify-content: center;
  `}
  ${media.medium_desktop`
    justify-content: flex-end;
  `}
`;
const LOGO_URL = require('../../../images/logo.png');

const Header = ({ isAuthenticated, handleLogout }) => (
  <Wrapper>
    <GridContainer>
      <GridRow>
        <GridColumnLogo md="2" sm="12">
          <Logo to="/"><LogoImage src={LOGO_URL} alt="logo" /></Logo>
        </GridColumnLogo>
        <GridColumnRight md="10" sm="12">
          <MenuItem active="true" to="/">Home</MenuItem>
          <MenuItem to="/contact">Contact</MenuItem>
          <MenuItem to="/about">About</MenuItem>
          {!isAuthenticated && <MenuItem to="/login">Login</MenuItem>}
          {isAuthenticated && <MenuItem to="#" onClick={() => { handleLogout(); }}>Logout</MenuItem>}
        </GridColumnRight>
      </GridRow>
    </GridContainer>
  </Wrapper>
);

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Header;
