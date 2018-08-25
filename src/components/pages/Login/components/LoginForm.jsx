import React from 'react';

const LogInForm = props => {
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    submitCount,
    errorApi,
  } = props;
  return (
    <div className="container-fluid">
      <div className="login-container container">
        <div className="row">
          <div className="col-md-3 offset-md-4">
            <form className="login-container__form-login form-login" onSubmit={handleSubmit}>
              <h4 className="login-container__title">Welcome back.</h4>
              {!!errorApi
                && submitCount > 0
                && <p className="login-container__error-text">* {errorApi}</p>}
              <input
                type="text"
                placeholder="username"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`login-container__form-control input-sm chat-input form-control ${errors.email && submitCount > 0 ?
                  'login-container__error-input' : ''} `} />
              {errors.email
                && submitCount > 0
                && <p className="login-container__error-text">* {errors.email}</p>}
              <br />
              <input
                type="password"
                id="password"
                placeholder="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`login-container__form-control input-sm chat-input form-control ${errors.password && submitCount > 0 ?
                  'login-container__error-input' : ''} `} />
              {errors.password
                && submitCount > 0
                && <p className="login-container__error-text">* {errors.password}</p>}
              <br/>
              <div className="login-container__wrapper wrapper">
                <span className="group-btn">
                  <button
                    disabled={isSubmitting}
                    className="btn btn-primary btn-md"
                    name="Submit"
                    value="Login"
                    type="Submit">
                    Login <i className="fa fa-sign-in"/>
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
