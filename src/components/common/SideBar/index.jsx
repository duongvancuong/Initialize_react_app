import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const MenuWrapper = styled.div`
  background-color: #2e353d;
  padding: 0px 40px;
  height: 100%;
  max-width: 300px;
  top: 0;
  left: 0;
  overflow-x: hidden;
  position: fixed;
`;

const BrandMenu = styled.label`
  font-size: 40px;
  cursor: pointer;
  background: url(${props => props.url}) no-repeat left center;
  padding: 10px 0 10px 50px;
  color: #ffffff;
  display: block;
`;

const MenuBody = styled.div`
  padding: 0 0 0 50px;
  overflow: hidden;
  position: absolute;
  max-width: 300px;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }
`;

const IconMenu = styled.input`
  display: none;

  &:checked ~ ${BrandMenu} {
    background-image: url(${props => props.url});
  }

  &:checked ~ ${MenuBody} {
    max-width: 0;
  }
`;

const MenuItem = styled(Link)`
  display:block;
  padding: 10px;

  &:hover {
    text-decoration: none;
  }
`;

const OPEN_MENU_URL = require('../../../images/menu.png');
const CLOSE_MENU_URL = require('../../../images/close.png');

const SideBar = ({ isAuthenticated, handleLogout }) => (
  <MenuWrapper>
    <IconMenu url={CLOSE_MENU_URL} type="checkbox" id="menu" />
    <BrandMenu url={OPEN_MENU_URL} htmlFor="menu">Menu</BrandMenu>
    <MenuBody>
      <ul>
        <li><MenuItem active="true" to="/">Home</MenuItem></li>
        <li><MenuItem to="/contact">Contact</MenuItem></li>
        <li><MenuItem to="/about">About</MenuItem></li>
        {!isAuthenticated && <li><MenuItem to="/login">Login</MenuItem></li>}
        {isAuthenticated && <li><MenuItem to="#" onClick={() => { handleLogout(); }}>Logout</MenuItem></li>}
      </ul>
    </MenuBody>
  </MenuWrapper>
);

SideBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default SideBar;
