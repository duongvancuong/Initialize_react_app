import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link className="logo" to="/">CompanyLogo</Link>
        <div className="header-right">
          <Link className="active" to="/">Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    );
  }
}

export default Header;
