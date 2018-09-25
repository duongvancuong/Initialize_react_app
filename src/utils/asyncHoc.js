/* eslint-disable */
import React from 'react';

export const createInstance = (defaultProps = {}) => {
  const { Consumer, Provider } = React.createContext();

  class Async extends React.Component {
    constructor(props) {
      super(props);
      this.mounted = false;
      this.counter = 0;
      this.args = [];
      this.state = {
        data: undefined,
        error: undefined,
        isLoading: false,
        startedAt: undefined,
        finishedAt: undefined,
        cancel: this.cancel,
        run: this.run,
        reload: () => {
          this.load();
          this.run(...this.args);
        },
        setData: this.setData,
        setError: this.setError,
      };
    }

    componentDidMount() {
      this.mounted = true;
      this.load();
    }

    componentDidUpdate(prevProps) {
      if (prevProps.watch !== this.props.watch) this.load();
    }

    componentWillUnmount() {
      this.cancel();
      this.mounted = false;
    }

    load = () => {
      const promiseFn = this.props.promiseFn || defaultProps.promiseFn;
      if (!promiseFn) return;
      this.counter++;
      this.setState({ isLoading: true, startedAt: new Date(), finishedAt: undefined });
      return promiseFn(this.props).then(this.onResolve(this.counter), this.onReject(this.counter));
    }

    run = (...args) => {
      const deferFn = this.props.deferFn || defaultProps.deferFn;
      if (!deferFn) return;
      this.counter++;
      this.args = args;
      this.setState({ isLoading: true, startedAt: new Date(), finishedAt: undefined });
      return deferFn(...args).then(this.onResolve(this.counter), this.onReject(this.counter));
    }

    cancel = () => {
      this.counter++;
      this.setState({ isLoading: false, startedAt: undefined });
    }

    onResolve = counter => data => {
      if (this.mounted && this.counter === counter) {
        const onResolve = this.props.onResolve || defaultProps.onResolve;
        this.setData(data, () => onResolve && onResolve(data));
      }
      return data;
    }

    onReject = counter => error => {
      if (this.mounted && this.counter === counter) {
        const onReject = this.props.onReject || defaultProps.onReject;
        this.setError(error, () => onReject && onReject(error));
      }
      return error;
    }

    setData = (data, callback) => {
      this.setState({ data, error: undefined, isLoading: false, finishedAt: new Date() }, callback);
      return data;
    }

    setError = (error, callback) => {
      this.setState({ error, isLoading: false, finishedAt: new Date() }, callback);
      return error;
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

  Async.Pending = ({ children, persist }) => (
    <Consumer>
      {state => {
        if (state.data !== undefined) return null;
        if (!persist && state.isLoading) return null;
        if (!persist && state.error !== undefined) return null;
        return typeof children === 'function' ? children(state) : children || null;
      }}
    </Consumer>
  );

  Async.Loading = ({ children, initial }) => (
    <Consumer>
      {state => {
        if (!state.isLoading) return null;
        if (initial && state.data !== undefined) return null;
        return typeof children === 'function' ? children(state) : children || null;
      }}
    </Consumer>
  );

  Async.Resolved = ({ children, persist }) => (
    <Consumer>
      {state => {
        if (state.data === undefined) return null;
        if (state.isLoading && !persist) return null;
        return typeof children === "function" ? children(state.data, state) : children || null;
      }}
    </Consumer>
  );

  Async.Rejected = ({ children, persist }) => (
    <Consumer>
      {state => {
        if (state.error === undefined) return null;
        if (state.isLoading && !persist) return null;
        return typeof children === "function" ? children(state.error, state) : children || null;
      }}
    </Consumer>
  );

  return Async;
}

export default createInstance();
