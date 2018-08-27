import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    const { isAuthenticated, handleLogout } = this.props;
    return (
      <div className="header">
        <Link className="logo" to="/">CompanyLogo</Link>
        <div className="header-right">
          <Link className="active" to="/">Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
          {!isAuthenticated && <Link to="/login">Login</Link>}
          {isAuthenticated && <Link to="#" onClick={() => {handleLogout()}}>Logout</Link>}
        </div>
      </div>
    );
  }
}

export default Header;
