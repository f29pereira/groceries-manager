import { IoText, PiChatText } from "../../../../utils/icons";
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
      <div className="input-container add-list">
        <div className="left-container label-required">
          <label htmlFor="groceriesList-name" className="form-label">
            Name
          </label>
          <RequiredField />
        </div>
        <div className="input-icon-container">
          <div className="centered-container input-icon">
            <IoText />
          </div>
          <input
            id="groceriesList-name"
            type="text"
            className="form-input"
            required
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>

        <div className="left-container label-required">
          <label htmlFor="groceriesList-description" className="form-label">
            Description
          </label>
        </div>

        <div className="input-icon-container">
          <div className="centered-column-container full-width">
            <div className="centered-container input-icon textarea-icon full-width">
              <PiChatText />
            </div>

            <textarea
              id="groceriesList-description"
              className="form-input text-description"
              name="description"
              onChange={handleChange}
              value={formData.description}
              placeholder="e.g., Buy on the supermarket..."
            ></textarea>
          </div>
        </div>
      </div>
      <div className="centered-container submit-cancel-btns">
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
