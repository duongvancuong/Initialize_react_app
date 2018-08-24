import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withFormik } from 'formik';

import LogInForm from './components/LoginForm';
import { requestLoginAction } from '../../../stores/auth/actions';
import { pwdValidateInput, emailValidateInput } from '../../../utils/inputValidate';


class Login extends Component {
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' }}
    const { isAuthenticated, error } = this.props;
    if (isAuthenticated) {
      return (
        <Redirect to={from} />
      )
    }
    return (
      <Fragment>
        <LogInForm
          values={this.props.values}
          errors={this.props.errors}
          isSubmitting={this.props.isSubmitting}
          handleChange={this.props.handleChange}
          handleBlur={this.props.handleBlur}
          handleSubmit={this.props.handleSubmit}
          submitCount={this.props.submitCount}
          errorApi={error}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { isAuthenticated, error } = state.auth;
  return {
    isAuthenticated,
    error,
  }
}

const EnhancedForm = withFormik({
  mapPropsToValues: () => ({ email: '', password: '' }),
  validate: (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!emailValidateInput(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Required';
    } else if (!pwdValidateInput(values.password)) {
      errors.password = 'Invalid password';
    }
    return errors;
  },
  handleSubmit: (values, bag) => {
    setTimeout(() => {
      bag.props.dispatch(requestLoginAction(values));
      bag.setSubmitting(false);
    }, 1000);
  },
  displayName: 'BasicForm', // helps with React DevTools
})(Login);

export default connect(mapStateToProps)(EnhancedForm);
