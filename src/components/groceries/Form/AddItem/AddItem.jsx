import { useContext, useState } from "react";
import { AuthContext } from "../../../../App";
import { useNavigate } from "react-router";
import { handleInputChange, showError } from "../../../../utils/utils";
import { IoIosAddCircle } from "../../../../utils/icons";
import SelectGroceryCategory from "../SelectGroceryCategory";
import Card from "../../../Elements/Card";
import ErrorMessage from "../../../Errors/ErrorMessage";
import { addItem } from "../../js/groceries_firebase";

function AddItem() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [groceryFormData, setGroceryFormData] = useState({
    name: "",
    quantity: "",
    categoryId: "",
  });

  const [errorMsg, setErrorMsg] = useState({
    generic: "",
  });

  const handleChange = (event) => {
    handleInputChange(event, setGroceryFormData);
  };

  const addItemToGroceryList = (event) => {
    event.preventDefault();

    addItem(currentUser.uid, groceryFormData)
      .then(() => {
        navigate("/groceries/list");
      })
      .catch((error) => {
        showError(error, setErrorMsg);
      });
  };

  return (
    <Card
      showGoBack={true}
      titleIcon={<IoIosAddCircle />}
      titleText="Add Item"
      body={
        <main className="main-form">
          <section className="section-form">
            <form
              className="form-container"
              onSubmit={addItemToGroceryList}
              autoComplete="on"
            >
              {errorMsg.generic.length > 0 ? (
                <ErrorMessage type="generic">{errorMsg.generic}</ErrorMessage>
              ) : null}

              <div className="input-container">
                <label htmlFor="grocery-name" className="form-label">
                  Name
                </label>
                <input
                  id="grocery-name"
                  type="text"
                  className="form-input"
                  required
                  name="name"
                  onChange={handleChange}
                  value={groceryFormData.name}
                />

                <label htmlFor="grocery-quantity" className="form-label">
                  Quantity
                </label>
                <input
                  id="grocery-quantity"
                  type="text"
                  className="form-input"
                  required
                  name="quantity"
                  onChange={handleChange}
                  value={groceryFormData.quantity}
                  placeholder="e.g., 5units, 500g, 1Kg"
                />
                <SelectGroceryCategory
                  handleChange={handleChange}
                  selectedCategory={groceryFormData.categoryId}
                />
              </div>

              <button type="submit" className="btn submit">
                Add
              </button>
            </form>
          </section>
        </main>
      }
    />
  );
}

export default AddItem;
