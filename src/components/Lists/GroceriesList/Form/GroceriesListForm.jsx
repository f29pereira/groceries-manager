import { IoText } from "../../../../utils/icons";
import ErrorMessage from "../../../ErrorHandling/Errors/ErrorMessage";
import RequiredField from "../../../Elements/RequiredField";

/**
 * Renders the Grocery List form with name/description fields
 * @param {function} handleOnSubmit     - on submit function
 * @param {function} handleChange       - sets name/description state values
 * @param {string} formData             - name/description state values
 * @param {funcion} handleCancel        - cancel button onClick function
 */
function GroceriesListForm({
  handleOnSubmit,
  handleChange,
  formData,
  handleCancel,
}) {
  return (
    <form
      className="form-container"
      onSubmit={handleOnSubmit}
      autoComplete="on"
    >
      <div className="input-container">
        <div className="left-container label-required">
          <label htmlFor="grocery-name" className="form-label">
            Name
          </label>
          <RequiredField />
        </div>
        <div className="input-icon-container">
          <div className="centered-container input-icon">
            <IoText />
          </div>
          <input
            id="grocery-name"
            type="text"
            className="form-input"
            required
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>

        <div className="left-container label-required">
          <label htmlFor="grocery-quantity" className="form-label">
            Description
          </label>
        </div>
        <div className="input-icon-container">
          <textarea
            id="grocery-quantity"
            className="form-input text-description"
            name="description"
            onChange={handleChange}
            value={formData.description}
            placeholder="e.g., Buy on the supermarket..."
          ></textarea>
        </div>
      </div>

      <div className="centered-container buttons add-grocery-list">
        <button type="submit" className="btn green">
          Submit
        </button>
        <button className="btn red" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default GroceriesListForm;
