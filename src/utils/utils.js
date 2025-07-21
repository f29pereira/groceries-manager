import { FirebaseError } from "firebase/app";

/**
 * Formats date YYY/MM/DD
 * @param {string} date - date timestamp
 */
export const formatDate = (date) => {
  let newDate = "";

  if (date !== null && typeof date === "string") {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    newDate = `${year}/${month}/${day}`;
  }

  return newDate;
};

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
 * Handles catched errors and adds them to state
 * @param {string} errorCode - firebase error code
 * @param {function} stateSetter - error message state setter function
 */
export const showError = (errorToHandle, stateSetter) => {
  const error = isFirebaseError(errorToHandle)
    ? errorToHandle.code
    : errorToHandle;

  setError(error, stateSetter);
};

/**
 * Checks if error is FirebaseError
 * @param {*} error
 * @returns
 */
const isFirebaseError = (error) => {
  return error instanceof FirebaseError;
};

/**
 * Sets new error message to state
 * @param {string} errorCode - error description
 * @param {function} stateSetter - error message state setter function
 */
const setError = (errorCode, stateSetter) => {
  const error = getErrorDescription(errorCode);
  const errorType = error.type;
  const errorDescription = error.description;

  stateSetter((prev) => ({
    ...prev,
    [errorType]: errorDescription,
  }));
};

/**
 * Return object with error type and description
 * @param {string} errorCode - error code
 * @returns
 */
const getErrorDescription = (errorCode) => {
  const error = {
    type: "",
    description: "",
  };

  if (errorCode === "auth/invalid-email") {
    error.type = "email";
    error.description = "Invalid email";
  } else if (errorCode === "auth/password-does-not-meet-requirements") {
    error.type = "password";
    error.description =
      "Password must contain: at least 8 characters, a lower case character, an upper case character and a non-alphanumeric character";
  } else if (errorCode === "auth/invalid-credential") {
    error.type = "generic";
    error.description = "Invalid credentials";
  } else if (errorCode === "auth/email-already-in-use") {
    error.type = "email";
    error.description = "Email already in use";
  } else if (errorCode === "auth/reset-confirm-not-equals") {
    error.type = "generic";
    error.description = "Password and Confirm Password don't match";
  } else {
    error.type = "generic";
    error.description = "Sorry, something went wrong.";
  }

  return error;
};
