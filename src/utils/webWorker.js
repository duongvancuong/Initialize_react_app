/* eslint-disable */
import React from 'react';

const { Consumer, Provider } = React.createContext();

class WebWorker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      errors: [],
      data: undefined,
      error: undefined,
      updatedAt: undefined,
      lastPostAt: undefined,
      postMessage: this.postMessage.bind(this),
    };
    this.onMessage = this.onMessage.bind(this);
    this.onError = this.onError.bind(this);
  }

  componentDidMount() {
    const { worker } = this.props;
    this.worker = worker;
    this.worker.onmessage = this.onMessage;
    this.worker.onerror = this.onError;
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
    this.props.worker || this.worker.terminate();
  }

  onMessage = message => {
    if (!this.mounted) return;
    const data = this.props.parser ? this.props.parser(message.data) : message.data;
    const date = new Date();
    this.setState(
      state => ({ data, error: undefined, messages: state.messages.concat({ data, date }), updatedAt: date }),
      () => this.props.onMessage && this.props.onMessage(data)
    );
  }

  onError = ({ error }) => {
    if (!this.mounted) return;
    const date = new Date();
    this.setState(
      state => ({ error, errors: state.errors.concat({ error, date }), updatedAt: date }),
      () => this.props.onError && this.props.onError(error)
    );
  }

  postMessage = data => {
    const { serializer = x => x } = this.props;
    const { postMessage } = this.worker || {};
    if (!postMessage) throw new Error('Worker not initialized');
    this.setState({ lastPostAt: new Date() }, () => postMessage.call(this.worker, serializer(data)));
  }

  render() {
    const { children } = this.props;
    if (typeof children === 'function') {
      return <Provider value={this.state}>{children(this.state)}</Provider>;
    }
    if (children !== undefined && children !== null) {
      return <Provider value={this.state}>{children}</Provider>;
    }
    return null;
  }
}

WebWorker.Pending = ({ children, persist }) => (
  <Consumer>
    {state => {
      if (state.data !== undefined) return null;
      if (!persist && state.error !== undefined) return null;
      return typeof children === 'function' ? children(state) : children || null;
    }}
  </Consumer>
)

WebWorker.Data = ({ children }) => (
  <Consumer>
    {state => {
      if (state.data === undefined) return null;
      return typeof children === 'function' ? children(state.data, state) : children || null;
    }}
  </Consumer>
)

WebWorker.Error = ({ children }) => (
  <Consumer>
    {state => {
      if (state.error === undefined) return null;
      return typeof children === 'function' ? children(state.error, state) : children || null;
    }}
  </Consumer>
)

export default WebWorker;
