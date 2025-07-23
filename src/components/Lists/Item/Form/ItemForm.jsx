import { useEffect, useState } from "react";
import ErrorMessage from "../../../Errors/ErrorMessage";
import RequiredField from "../../../Elements/RequiredField";
import SelectGroceryCategory from "./SelectGroceryCategory";
import { IoAdd, RiWeightLine, IoText, BiTag } from "../../../../utils/icons";
import Loading from "../../../Elements/Loading";
import { fetchGroceryCategories } from "../../js/items_firebase";

/**
 * Renders Item name/quantity/category from
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
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  useEffect(() => {
    const getCategories = () => {
      fetchGroceryCategories()
        .then((categories) => {
          setCategories(categories);
          setIsLoadingCategories(false);
        })
        .catch((error) => console.log(error));
    };

    getCategories();
  }, []);

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

        {isLoadingCategories ? (
          <Loading>Loading grocery categories</Loading>
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
