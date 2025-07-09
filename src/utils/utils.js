/**
 * Sets the current input value change to state
 * @param {object} event - input event
 * @param {function} stateSetter - state setter function
 */
export const handleInputChange = (event, stateSetter) => {
  const { name, value } = event.target;
  stateSetter((prev) => ({
    ...prev,
    [name]: value,
  }));
};

/**
 * Sets new error message
 * @param {string} errorCode - firebase error code
 * @param {function} stateSetter - error message state setter function
 */
export const setInputError = (errorCode, stateSetter) => {
  const error = getError(errorCode);
  const errorType = error.inputType;
  const errorDescription = error.description;

  stateSetter((prev) => ({
    ...prev,
    [errorType]: errorDescription,
  }));
};

/**
 * Returns object with input and error message associated with errorCode
 * @param {string} errorCode - firebase error code
 * @returns
 */
const getError = (errorCode) => {
  const error = {
    inputType: "",
    description: "",
  };

  if (errorCode === "auth/password-does-not-meet-requirements") {
    error.inputType = "password";
    error.description =
      "Password must contain: at least 8 characters, a lower case character, an upper case character and a non-alphanumeric character";
  } else if (errorCode === "auth/invalid-credential") {
    error.inputType = "generic";
    error.description = "Invalid credentials";
  } else if (errorCode === "auth/email-already-in-use") {
    error.inputType = "email";
    error.description = "Email already in use";
  } else {
    error.inputType = "generic";
    error.description = "Sorry, something went wrong.";
  }

  return error;
};
