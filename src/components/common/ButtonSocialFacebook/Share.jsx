import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/* eslint-disable */
const Share = ({ href, layout, size }) => (
  <Fragment>
    <div
        className="fb-share-button"
        data-href={href}
        data-layout={layout}
        data-size={size}
        data-mobile-iframe="true"
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.facebook.com/sharer/sharer.php?u=${href};src=sdkpreparse`}
          className="fb-xfbml-parse-ignore"
        />
    </div>
  </Fragment>
);

Share.propTypes = {
  href: PropTypes.string,
  layout: PropTypes.oneOf(['standard', 'box_count', 'button_count', 'button']),
  size: PropTypes.string,
};

Share.defaultProps = {
  layout: 'button',
  size: 'small',
  href: null,
};

export default Share;
