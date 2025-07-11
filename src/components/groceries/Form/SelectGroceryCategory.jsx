import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import Loading from "../../Elements/Loading";

/**
 * Component that renders categories list drop down menu
 * @param {function} handleChange   - sets category id state value
 * @param {string} selectedCategory - category id state value
 */
function SelectGroceryCategory({ handleChange, selectedCategory }) {
  const [categories, setCategories] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "grocery_categories")
        );

        const dataList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCategories(dataList);
        setLoadingData(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {loadingData ? (
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
