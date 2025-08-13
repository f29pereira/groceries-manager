import { FirebaseError } from "firebase/app";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

/**
 * Returns the document reference and snapshot for a given collection/document id
 * @param {string} collectionName - collection name
 * @param {string} documentId     - document id
 * @returns {object}              - object with reference/snapShot attributes
 */
export const getDocumentRefSnapShot = async (collectionName, documentId) => {
  const docRef = doc(db, collectionName, documentId);
  const docSnapshot = await getDoc(docRef);

  return {
    reference: docRef,
    snapShot: docSnapshot,
  };
};

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

/**
 * Checks if value is a string
 * @param {string} value - value to validate
 * @param {string} valueName - value description name to appear on exception message
 * @throws {Error} - if value isn't string
 */
export const validateString = (value, valueName) => {
  if (typeof value !== "string") {
    throw new Error(
      `Invalid data type: ${valueName} must be string. Current value: ${value}`
    );
  }

  return;
};

/**
 * Checks if value is an array
 * @param {string} array - array to validate
 * @param {string} arrayName - array description name to appear on exception message
 * @throws {Error} - if isn't array
 */
export const validateArray = (array, arrayName) => {
  if (!Array.isArray(array)) {
    throw new Error(
      `Invalid data type: ${arrayName} must be an array. Current value: ${array}`
    );
  }
};

/**
 * Checks if value is an object
 * @param {object} object - object to validate
 * @param {string} objectName - object description name to appear on exception message
 * @throws {Error} - if isn't object
 */
export const validateObject = (object, objectName) => {
  if (typeof object !== "object" || object === null) {
    throw new Error(
      `Invalid data type: ${objectName} must be an object. Current value: ${object}`
    );
  }
};

/**
 * Compares two strings and returns number
 * @param {string} firstString - first string value
 * @param {string} secondString - second string value
 * @returns {number} returns -1 (firstString < secondString), 1 (firstString > secondString), 0 (firstString = secondString)
 */
export const compareStrings = (firstString, secondString) => {
  validateString(firstString);
  validateString(secondString);

  return firstString.toLowerCase().localeCompare(secondString.toLowerCase());
};
