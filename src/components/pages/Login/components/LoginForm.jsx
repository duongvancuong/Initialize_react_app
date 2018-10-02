import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { colors, font } from '../../../../styles/abstracts/variables.json';

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
  ${props => props.error && props.submited && css`
    border-color: ${colors.red};
  `}
`;

const ButtonGroup = styled.div`
  text-align: center;
`;

const TextError = styled.p`
  color: ${colors.red};
  font-size: ${font.size.smallest}
`;

const showErrorText = message => (
  <TextError>
    *
    {message}
  </TextError>
);

const LogInForm = (props) => {
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
                && showErrorText(errorApi)
              }
              <Input
                type="text"
                placeholder="username"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                submited={submitCount > 0}
                className="input-sm chat-input form-control"
              />
              {errors.email
                && submitCount > 0
                && showErrorText(errors.email)
              }
              <br />
              <Input
                type="password"
                id="password"
                placeholder="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                submited={submitCount > 0}
                className="input-sm chat-input form-control"
              />
              {errors.password
                && submitCount > 0
                && showErrorText(errors.password)
              }
              <br />
              <ButtonGroup className="wrapper">
                <span className="group-btn">
                  <button
                    disabled={isSubmitting}
                    className="btn btn-primary btn-md"
                    name="Submit"
                    type="submit"
                  >
                    Login
                    <i className="fa fa-sign-in" />
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

LogInForm.propTypes = {
  errorApi: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  submitCount: PropTypes.number.isRequired,
  values: PropTypes.object.isRequired,
};

export default LogInForm;
