import React, { Component } from 'react';
import PropTypes from 'prop-types';
import findByType from '../../../utils/findByType';
import Like from './Like';
import Share from './Share';

class ButtonSocialFacebook extends Component {
  constructor(props) {
    super(props);
    this.renderLikeButton = this.renderLikeButton.bind(this);
  }
  /* eslint-disable */
  componentDidMount() {
    const { language, appId, version } = this.props;
    if (document && typeof document !== 'undefined') {
      ((d, s, id) => {
        const fjs = d.getElementsByTagName(s)[d.getElementsByTagName(s).length - 1];
        if (d.getElementById(id)) return;
        const js = d.createElement(s);
        js.id = id;
        js.src = `//connect.facebook.net/${language}/sdk.js#xfbml=1&version=${version}&appId=${appId}`;
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    }
    if (typeof(FB) != 'undefined') {
      FB.XFBML.parse();
    }
  }

  renderLikeButton() {
    const { children } = this.props;
    const likeButton = findByType(children, Like);
    if (!likeButton) {
      return null;
    }
    return <Like {...likeButton.props} />;
  }

  renderShareButton() {
    const { children } = this.props;
    const shareButton = findByType(children, Share);
    if (!shareButton) {
      return null;
    }
    return <Share {...shareButton.props} />;
  }

  render() {
    return (
      <div>
        {this.renderLikeButton()}
        {this.renderShareButton()}
      </div>
    );
  }
}

ButtonSocialFacebook.propTypes = {
  appId: PropTypes.string.isRequired,
  version: PropTypes.string,
  language: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(),
    PropTypes.node,
  ]),
};

ButtonSocialFacebook.defaultProps = {
  language: 'en_US',
  version: 'v2.12',
  children: null,
};

ButtonSocialFacebook.Like = Like;
ButtonSocialFacebook.Share = Share;
export default ButtonSocialFacebook;
