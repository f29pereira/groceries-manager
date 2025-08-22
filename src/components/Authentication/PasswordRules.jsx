import { useEffect, useState } from "react";
import { FaCheckSquare, FaWindowClose } from "../../utils/icons";

/**
 * Renders password rules used in the Sign Up page
 */
function PasswordRules({ password }) {
  //useState Hook
  const [passwordRules, setPasswordRules] = useState([
    {
      description: "Minimum 8 characters",
      test: (pw) => pw.length >= 8,
      isValid: false,
    },
    {
      description: "At least one lower case character",
      test: (pw) => /[a-z]/.test(pw),
      isValid: false,
    },
    {
      description: "At least one upper case character",
      test: (pw) => /[A-Z]/.test(pw),
      isValid: false,
    },
    {
      description: "At least one numeric character",
      test: (pw) => /[0-9]/.test(pw),
      isValid: false,
    },
    {
      description: "At least one special character (e.g, ! @ # % $)",
      test: (pw) =>
        /(?=.*[\^\$\*\.\[\]\{\}\(\)\?"!@#%&/\\,><':;\|_~])/.test(pw),
      isValid: false,
    },
  ]);

  //useEffect Hook
  // Updates password rules isValid when password changes value
  useEffect(() => {
    setPasswordRules((prev) =>
      prev.map((ruleObj) => ({
        ...ruleObj,
        isValid: ruleObj.test(password),
      }))
    );
  }, [password]);

  return (
    <div className="password-rules">
      <div className="rules-list">
        {passwordRules.map((rule, index) => (
          <div className="rules-item" key={index}>
            {rule.isValid ? (
              <FaCheckSquare className="rules-icon success-icon" />
            ) : (
              <FaWindowClose className="rules-icon delete-icon" />
            )}
            <span>{rule.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PasswordRules;
