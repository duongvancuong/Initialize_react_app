import React from 'react';
import styled from 'styled-components';
const Wrapper = styled.div`
  padding: 25px;
  margin: auto;
`;
const FormLogin = styled.form`
  background-color: #EDEDED;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 15px;
  border-color:#d2d2d2;
  border-width: 5px;
  box-shadow:0 1px 0 #cfcfcf;
`;
const Title = styled.h4`
  border:0 solid #fff;
  border-bottom-width:1px;
  padding-bottom:10px;
  text-align: center;
`;
const Input = styled.input`
  border-radius: 10px;
`;
const ButtonGroup = styled.div`
  text-align: center;
`;
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
      <Wrapper className="container">
        <div className="row">
          <div className="col-md-3 offset-md-4">
            <FormLogin className="form-login" onSubmit={handleSubmit}>
              <Title>Welcome back.</Title>
              {!!errorApi
                && submitCount > 0
                && <p className="login-container__error-text">* {errorApi}</p>}
              <Input
                type="text"
                placeholder="username"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-sm chat-input form-control ${errors.email && submitCount > 0 ?
                  'login-container__error-input' : ''} `} />
              {errors.email
                && submitCount > 0
                && <p className="login-container__error-text">* {errors.email}</p>}
              <br />
              <Input
                type="password"
                id="password"
                placeholder="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input-sm chat-input form-control ${errors.password && submitCount > 0 ?
                  'login-container__error-input' : ''} `} />
              {errors.password
                && submitCount > 0
                && <p className="login-container__error-text">* {errors.password}</p>}
              <br/>
              <ButtonGroup className="wrapper">
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
              </ButtonGroup>
            </FormLogin>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default LogInForm;
