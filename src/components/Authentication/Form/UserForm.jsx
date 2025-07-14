import { Link } from "react-router";
import ErrorMessage from "../../Errors/ErrorMessage";
import { FaQuestionCircle } from "react-icons/fa";

/**
 * Component that renders user email/password authentication form
 * @param {function} handleOnSubmit     - on submit function
 * @param {string} description          - form description
 * @param {string} errorMsg             - input specific/generic error message
 * @param {function} handleChange       - sets email/password state values
 * @param {string} formData             - email/password state values
 * @param {boolean} forgotPassword      - shows forgotPassword link
 * @param {string} submitBtnTxt         - submit button text
 */
function UserForm({
  handleOnSubmit,
  description,
  errorMsg,
  handleChange,
  formData,
  forgotPassword,
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

          <div className="input-container">
            <p className="form-description">{description}</p>
            <label htmlFor="user-email" className="form-label">
              Email
            </label>
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

            <label htmlFor="user-password" className="form-label">
              Password
            </label>
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

            {errorMsg.password.length > 0 ? (
              <ErrorMessage type="input">{errorMsg.password}</ErrorMessage>
            ) : null}

            {forgotPassword ? (
              <Link to="/resetPassword" className="click-link reset-password">
                Forgot Password ?
              </Link>
            ) : null}
          </div>

          <button type="submit" className="btn submit">
            {submitBtnTxt}
          </button>
        </form>
      </section>
    </main>
  );
}

export default UserForm;
