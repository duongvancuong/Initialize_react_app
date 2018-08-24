export const pwdValidateInput = (checkingText) => {
  const regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  return regexp.test(checkingText);
}

export const emailValidateInput = (checkingText) => {
  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  return emailRegex.test(checkingText);
}
