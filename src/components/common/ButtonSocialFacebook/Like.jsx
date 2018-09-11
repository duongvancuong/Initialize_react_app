import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/* eslint-disable */
const Like = ({ href, layout, action, size, share, showFaces, reference, width, colorscheme, kidDirectedSite }) => (
  <Fragment>
    <div
      className="fb-like"
      data-href={href}
      data-layout={layout}
      data-action={action}
      data-size={size}
      data-show-faces={showFaces}
      data-share={share}
      data-width={width}
      data-ref={reference}
      data-colorscheme={colorscheme}
      data-kid-directed-site={kidDirectedSite}
    />
  </Fragment>
);

Like.propTypes = {
  href: PropTypes.string,
  layout: PropTypes.oneOf(['standard', 'box_count', 'button_count', 'button']),
  action: PropTypes.string,
  size: PropTypes.string,
  share: PropTypes.bool,
  showFaces: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  reference: PropTypes.string,
  colorscheme: PropTypes.string,
  kidDirectedSite: PropTypes.bool,
};

Like.defaultProps = {
  layout: 'box_count',
  action: 'like',
  size: 'small',
  share: false,
  showFaces: true,
  colorscheme: 'light',
  kidDirectedSite: false,
  href: null,
  width: null,
  reference: null,
};

export default Like;
