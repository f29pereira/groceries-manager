import { useEffect, useState } from "react";
import RequiredField from "../../../Elements/RequiredField";
import { IoAdd, RiWeightLine, IoText, BiTag } from "../../../../utils/icons";
import LoadingIcon from "../../../Elements/LoadingIcon";
import { fetchGroceryCategories } from "../../js/items_firebase";

/**
 * Renders Item name/quantity/category from
 * @param {function} handleOnSubmit     - on submit function
 * @param {function} handleChange       - sets name/quantity/category state values
 * @param {string} formData             - name/quantity/category state values
 * @param {function} handleCancel       - cancel btn function
 */
function ItemForm({ handleOnSubmit, handleChange, formData, handleCancel }) {
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = () => {
      fetchGroceryCategories()
        .then((categories) => {
          setCategories(categories);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(setIsLoadingCategories(false));
    };

    getCategories();
  }, []);

  if (error) {
    console.log(error);
    throw error; //error to be caught by ErrorBoundary
  }

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

        {isLoadingCategories ? (
          <LoadingIcon>Loading grocery categories</LoadingIcon>
        ) : (
          <>
            <div className="left-container label-required">
              <label htmlFor="grocery-category" className="form-label">
                Category
              </label>
              <RequiredField />
            </div>
            <div className="input-icon-container">
              <div className="centered-container input-icon">
                <BiTag />
              </div>

              <select
                id="grocery-category"
                className="select-input form-input"
                required
                name="category_id"
                onChange={handleChange}
                value={formData.category_id}
              >
                {formData.category_id === "" && (
                  <option value="" disabled>
                    Select a category
                  </option>
                )}

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
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

export default ItemForm;
