import ErrorMessage from "../../../Errors/ErrorMessage";
import RequiredField from "../../../Elements/RequiredField";
import SelectGroceryCategory from "./SelectGroceryCategory";
import { IoAdd, RiWeightLine, IoText } from "../../../../utils/icons";

/**
 * Renders item from the grocery list form
 * @param {function} handleOnSubmit     - on submit function
 * @param {string} errorMsg             - input specific/generic error message
 * @param {function} handleChange       - sets name/quantity/category state values
 * @param {string} formData             - name/quantity/category state values
 * @param {function} handleCancel       - cancel btn function
 */
function ItemForm({
  handleOnSubmit,
  errorMsg,
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
      {errorMsg.generic.length > 0 ? (
        <ErrorMessage type="generic">{errorMsg.generic}</ErrorMessage>
      ) : null}

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
            Quantity
          </label>
          <RequiredField />
        </div>
        <div className="input-icon-container">
          <div className="centered-container input-icon">
            <RiWeightLine />
          </div>
          <input
            id="grocery-quantity"
            type="text"
            className="form-input"
            required
            name="quantity"
            onChange={handleChange}
            value={formData.quantity}
            placeholder="e.g., 5units, 500g, 1Kg"
          />
        </div>

        <SelectGroceryCategory
          handleChange={handleChange}
          selectedCategory={formData.categoryId}
        />
      </div>

      <div className="centered-container buttons">
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

export default ItemForm;
