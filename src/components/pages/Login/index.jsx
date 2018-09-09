import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withFormik } from 'formik';

import LogInForm from './components/LoginForm';
import { authenticateUser, cleanErrorLogin } from '../../../stores/auth/actions';
import { pwdValidateInput, emailValidateInput } from '../../../utils/inputValidate';


class Login extends Component {
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(cleanErrorLogin());
  }

  render() {
    const {
      location,
      isAuthenticated,
      error,
      values,
      errors,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      submitCount,
    } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };
    if (isAuthenticated) {
      return (
        <Redirect to={from} />
      );
    }
    return (
      <Fragment>
        <LogInForm
          values={values}
          errors={errors}
          isSubmitting={isSubmitting}
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleSubmit={handleSubmit}
          submitCount={submitCount}
          errorApi={error}
        />
      </Fragment>
    );
  }
}

Login.propTypes = {
  location: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitCount: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { isAuthenticated, error } = state.auth;
  return {
    isAuthenticated,
    error,
  };
};

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
      bag.props.dispatch(authenticateUser(values));
      bag.setSubmitting(false);
    }, 1000);
  },
  displayName: 'LoginForm',
})(Login);

export default connect(mapStateToProps)(EnhancedForm);
