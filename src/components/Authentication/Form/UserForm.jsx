import ErrorMessage from "../../Errors/ErrorMessage";

/**
 * Component that renders user email/password authentication form
 * @param {function} handleOnSubmit - on submit function
 * @param {string} title            - form title
 * @param {string} errorMsg         - input specific/generic error message
 * @param {function} handleChange   - sets email/password state values
 * @param {string} formData         - email/password state values
 */
function UserForm({ handleOnSubmit, title, errorMsg, handleChange, formData }) {
  return (
    <main className="main-form">
      <section className="section-form">
        <form
          className="form-container"
          onSubmit={handleOnSubmit}
          autoComplete="on"
        >
          <h1>{title}</h1>

          {errorMsg.generic.length > 0 ? (
            <ErrorMessage type="generic">{errorMsg.generic}</ErrorMessage>
          ) : null}

          <div className="input-container">
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
          </div>

          <button type="submit" className="submit-btn">
            {title}
          </button>
        </form>
      </section>
    </main>
  );
}

export default UserForm;
