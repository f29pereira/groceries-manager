import { useEffect, useState } from "react";
import { fetchGroceryCategories } from "../../js/items_firebase";
import { BiTag } from "../../../../utils/icons";
import Loading from "../../../Elements/Loading";
import RequiredField from "../../../Elements/RequiredField";

/**
 * Renders categories list drop down menu
 * @param {function} handleChange   - sets category id state value
 * @param {string} selectedCategory - category id state value
 */
function SelectGroceryCategory({ handleChange, selectedCategory }) {
  const [categories, setCategories] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const getCategories = () => {
      fetchGroceryCategories()
        .then((data) => {
          setCategories(data);
          setIsLoadingData(false);
        })
        .catch((error) => console.log(error));
    };

    getCategories();
  }, []);

  return (
    <>
      {isLoadingData ? (
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
              name="categoryId"
              onChange={handleChange}
              value={selectedCategory}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </>
  );
}

export default SelectGroceryCategory;
