import { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import copyStyles from '../../../utils/copyStyles';

class WindowExternal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      el: null,
    };
    this.containerEl = document.createElement('div');
    this.externalWindow = null;
  }
  /* eslint-disable */
  componentDidMount() {
    this.externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200');
    this.externalWindow.title = 'A React portal window';

    this.containerEl = document.createElement('div');
    copyStyles(document, this.externalWindow.document);

    this.externalWindow.document.body.appendChild(this.containerEl);
    this.externalWindow.addEventListener('beforeunload', () => {
      this.props.closeWindowPortal();
    });

    this.setState({ el: this.containerEl });
  }

  componentWillUnmount() {
    this.props.closeWindowPortal();
    this.externalWindow.close();
  }

  render() {
    const { el } = this.state;
    if (!el) {
      return null;
    }
    return ReactDOM.createPortal(this.props.children, el);
  }
}

WindowExternal.propTypes = {
  closeWindowPortal: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default WindowExternal;
