import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import themes from '../styles/abstracts/themes';

export const SiteThemeContext = React.createContext();

class SiteThemeProvider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.theme1,
    };
    this.handleThemeChange = this.handleThemeChange.bind(this);
  }

  handleThemeChange = (e) => {
    const key = e.target.value;
    const theme = themes[key];
    this.setState({ theme });
  }

  render() {
    const { children } = this.props;
    return (
      <SiteThemeContext.Provider
        value={{
          ...this.state,
          handleThemeChange: this.handleThemeChange,
        }}
      >
        {children}
      </SiteThemeContext.Provider>
    );
  }
}

SiteThemeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default SiteThemeProvider;
