import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { media } from '../../../styles/abstracts/_media';

const Wrapper = styled.div`
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  background: #3fa46a;
`;
const Container = styled.div`
  max-width: 1170px;
  padding: 10px;
  margin: auto;
  display: flex;
  justify-content: flex-start;

  ${media.tablet`
    justify-content: center;
    flex-flow: column wrap;
    padding: 0;
  `}
`;
const MenuItem = styled(Link)`
  color: ${props => props.active ? '#ffffff;' : 'black'};
  padding: 20px 0;
  font-size: 18px;
  line-height: 25px;
  border-top: 4px solid #3fa46a;
  border-bottom: 4px solid #3fa46a;
  margin: 0 20px;
  transition: 0.3s ease;

  &:hover {
    text-decoration: none;
    color: ${props => props.active ? '#ffffff' : 'black'};
    border-top: 4px solid #ffffff;
    border-bottom: 4px solid #ffffff;
    padding: 6px 0;
  }

  ${media.tablet`
    justify-content: space-around;
  `}
`;
const Logo = styled(Link)`
  font-size: 25px;
  font-weight: bold;

  &:hover {
    background-color: #f1f1f1;
  }

  ${media.tablet`
    align-self: center;
  `}
`;
const WrapperRight = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
  align-items: center;

  ${media.tablet`
    justify-content: space-around;
  `}

  ${media.phone`
    flex-flow: column wrap;
  `}
`;
const LogoImage = styled.img`
  height: 50px;
  width: 100px;
`;

const LOGO_URL = require('../../../images/logo.png');

class Header extends Component {
  render() {
    const { isAuthenticated, handleLogout } = this.props;
    return (
      <Wrapper>
        <Container>
          <Logo to="/"><LogoImage src={LOGO_URL} alt="logo"/></Logo>
          <WrapperRight className="header-right">
            <MenuItem active="true" to="/">Home</MenuItem>
            <MenuItem to="/contact">Contact</MenuItem>
            <MenuItem to="/about">About</MenuItem>
            {!isAuthenticated && <MenuItem to="/login">Login</MenuItem>}
            {isAuthenticated && <MenuItem to="#" onClick={() => {handleLogout()}}>Logout</MenuItem>}
          </WrapperRight>
        </Container>
      </Wrapper>
    );
  }
}

export default Header;
