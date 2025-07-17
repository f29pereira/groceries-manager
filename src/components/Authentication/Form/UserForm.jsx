import { Link } from "react-router";
import ErrorMessage from "../../Errors/ErrorMessage";
import { MdAlternateEmail, TbLockPassword } from "../../../utils/icons";
import RequiredField from "../../Elements/RequiredField";

/**
 * Component that renders user email/password authentication form
 * @param {function} handleOnSubmit     - on submit function
 * @param {string} description          - form description
 * @param {string} errorMsg             - input specific/generic error message
 * @param {function} handleChange       - sets email/password state values
 * @param {string} formData             - email/password state values
 * @param {boolean} forgotPassword      - shows forgotPassword link
 * @param {boolean} showPasswordRules   - shows pop up with password rules
 * @param {string} submitBtnTxt         - submit button text
 */
function UserForm({
  handleOnSubmit,
  description,
  errorMsg,
  handleChange,
  formData,
  forgotPassword,
  showPasswordRules,
  submitBtnTxt,
}) {
  return (
    <main className="main-form">
      <section className="section-form">
        <form
          className="form-container"
          onSubmit={handleOnSubmit}
          autoComplete="on"
        >
          {errorMsg.generic.length > 0 ? (
            <ErrorMessage type="generic">{errorMsg.generic}</ErrorMessage>
          ) : null}

          <p className="form-description">{description}</p>

          <div className="input-container">
            <div className="left-container label-required">
              <label htmlFor="user-email" className="form-label">
                Email
              </label>
              <RequiredField />
            </div>
            <div className="input-icon-container">
              <div className="centered-container input-icon">
                <MdAlternateEmail />
              </div>
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
              {errorMsg.email.length > 0 ? (
                <ErrorMessage type="input">{errorMsg.email}</ErrorMessage>
              ) : null}
            </div>

            <div className="left-container label-required">
              <label htmlFor="user-password" className="form-label">
                Password
              </label>
              <RequiredField />
            </div>

            <div
              className={`column-container full-width ${
                showPasswordRules ? "password-rules-pop-up" : ""
              }`}
            >
              <div className="input-icon-container">
                <div className="centered-container input-icon">
                  <TbLockPassword />
                </div>
                <input
                  id="user-password"
                  type="password"
                  className="form-input password"
                  required
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  autoComplete="current-password"
                />
              </div>
              {showPasswordRules ? (
                <div className="password-rules">
                  <ul className="rules-list">
                    <li className="rules-item">minimum 8 characters</li>
                    <li className="rules-item">1 lower case character</li>
                    <li className="rules-item">1 upper case character</li>
                    <li className="rules-item">
                      1 numeric case character (0-9)
                    </li>
                    <li className="rules-item">1 non-alphanumeric character</li>
                  </ul>
                </div>
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

          <button type="submit" className="btn submit">
            {submitBtnTxt}
          </button>
        </form>
      </section>
    </main>
  );
}

export default UserForm;
