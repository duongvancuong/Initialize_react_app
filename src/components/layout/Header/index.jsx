import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { media } from '../../../styles/abstracts/_media';

const Wrapper = styled.div`
  overflow: hidden;
  background-color: #f1f1f1;
  padding: 20px 10px;
`;
const MenuItem = styled(Link)`
  float: left;
  color: ${props => props.active ? 'white' : 'black'};
  text-align: center;
  padding: 12px;
  font-size: 18px;
  line-height: 25px;
  border-radius: 4px;
  background-color: ${props => props.active && 'dodgerblue'};

  &:hover {
    background-color: ${props => props.active ? 'dodgerblue' : '#ddd'};
    color: ${props => props.active ? 'white' : 'black'};
    text-decoration: none;
  }

  ${media.tablet`
    float: none;
    display: block;
    text-align: left;
  `}
`;
const Logo = styled(MenuItem)`
  font-size: 25px;
  font-weight: bold;
`;
const WrapperRight = styled.div`
  float: right;
  ${media.tablet`
    float: none;
  `}
`;

class Header extends Component {
  render() {
    const { isAuthenticated, handleLogout } = this.props;
    return (
      <Wrapper>
        <Logo to="/">CompanyLogo</Logo>
        <WrapperRight className="header-right">
          <MenuItem active="true" to="/">Home</MenuItem>
          <MenuItem to="/contact">Contact</MenuItem>
          <MenuItem to="/about">About</MenuItem>
          {!isAuthenticated && <MenuItem to="/login">Login</MenuItem>}
          {isAuthenticated && <MenuItem to="#" onClick={() => {handleLogout()}}>Logout</MenuItem>}
        </WrapperRight>
      </Wrapper>
    );
  }
}

export default Header;
