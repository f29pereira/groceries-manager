import { Link } from "react-router";
import ErrorMessage from "../../ErrorHandling/Errors/ErrorMessage";
import {
  MdAlternateEmail,
  TbLockPassword,
  BsThreeDots,
} from "../../../utils/icons";
import RequiredField from "../../Elements/RequiredField";
import GMLogo from "../../Elements/GMLogo";
import PasswordRules from "../PasswordRules";

/**
 * Renders user email/password authentication form
 * @param {string} formType             - form type (signIn/signUp)
 * @param {function} handleOnSubmit     - on submit function
 * @param {string} description          - form description
 * @param {string} errorMsg             - input specific/generic error message
 * @param {function} handleChange       - sets email/password state values
 * @param {string} formData             - email/password state values
 * @param {boolean} forgotPassword      - shows forgotPassword link
 * @param {boolean} showRequiredFields  - shows required field icon
 * @param {boolean} showPasswordRules   - shows pop up with password rules
 * @param {string} submitBtnTxt         - submit button text
 * @param {boolean} isSubmitting        - form is submitting
 * @param {string} submittingBtnTxt     - button text when form is submitting
 */
function UserForm({
  type = "",
  handleOnSubmit,
  description,
  errorMsg,
  handleChange,
  formData,
  forgotPassword,
  showRequiredFields = true,
  showPasswordRules,
  submitBtnTxt,
  isSubmitting,
  submittingBtnTxt,
}) {
  return (
    <form
      className="form-container"
      onSubmit={handleOnSubmit}
      autoComplete="on"
    >
      {errorMsg.generic.length > 0 ? (
        <ErrorMessage type="generic">{errorMsg.generic}</ErrorMessage>
      ) : null}

      <GMLogo />

      <p className="form-description">{description}</p>

      <div className="input-container user-form">
        <div className="left-container label-required">
          <label htmlFor="user-email" className="form-label">
            Email
          </label>
          {showRequiredFields ? <RequiredField /> : null}
        </div>
        <div className="input-icon-container">
          <MdAlternateEmail className="input-icon" />
          <input
            id="user-email"
            type="email"
            className="form-input"
            required
            name="email"
            onChange={handleChange}
            value={formData.email}
            autoComplete="email"
          />
        </div>

        {errorMsg.email.length > 0 ? (
          <ErrorMessage type="input">{errorMsg.email}</ErrorMessage>
        ) : null}

        <div className="left-container label-required">
          <label htmlFor="user-password" className="form-label">
            Password
          </label>
          {showRequiredFields ? <RequiredField /> : null}
        </div>

        <div
          className={`column-container full-width ${
            showPasswordRules ? "password-rules-pop-up" : ""
          }`}
        >
          <div className="input-icon-container password">
            <div className="centered-container input-icon">
              <TbLockPassword />
            </div>
            <input
              id="user-password"
              type="password"
              className="form-input"
              required
              name="password"
              onChange={handleChange}
              value={formData.password}
              autoComplete="current-password"
            />
          </div>
          {showPasswordRules ? (
            <PasswordRules password={formData.password} />
          ) : null}
        </div>

        {errorMsg.password.length > 0 ? (
          <ErrorMessage type="input">{errorMsg.password}</ErrorMessage>
        ) : null}
      </div>
      {forgotPassword ? (
        <Link to="/resetPassword" className="click-link reset-password">
          Forgot Password ?
        </Link>
      ) : null}

      <button
        type="submit"
        className={`btn green ${type}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="centered-container">
            {submittingBtnTxt}
            <BsThreeDots className="submitting-icon" />
          </div>
        ) : (
          submitBtnTxt
        )}
      </button>
    </form>
  );
}

export default UserForm;
