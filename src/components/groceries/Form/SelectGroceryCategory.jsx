import { useEffect, useState } from "react";
import { fetchGroceryCategories } from "../js/groceries_firebase";
import Loading from "../../Elements/Loading";

/**
 * Component that renders categories list drop down menu
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
          <label htmlFor="grocery-category" className="form-label">
            Category
          </label>
          <select
            id="grocery-category"
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
        </>
      )}
    </>
  );
}

export default SelectGroceryCategory;
