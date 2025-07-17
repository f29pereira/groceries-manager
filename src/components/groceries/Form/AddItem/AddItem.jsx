import { useContext, useState } from "react";
import { AuthContext } from "../../../../App";
import { useNavigate } from "react-router";
import { handleInputChange, showError } from "../../../../utils/utils";
import { IoAdd, RiWeightLine, IoText } from "../../../../utils/icons";
import SelectGroceryCategory from "../SelectGroceryCategory";
import Card from "../../../Elements/Card";
import ErrorMessage from "../../../Errors/ErrorMessage";
import { addItem } from "../../js/groceries_firebase";
import Footer from "../../../Static/Footer";
import RequiredField from "../../../Elements/RequiredField";

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

  const clearData = () => {
    setGroceryFormData({ name: "", quantity: "", categoryId: "" });
  };

  return (
    <>
      <main>
        <div className="content card">
          <Card
            showGoBack={true}
            titleIcon={<IoAdd />}
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
                      <ErrorMessage type="generic">
                        {errorMsg.generic}
                      </ErrorMessage>
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
                          value={groceryFormData.name}
                        />
                      </div>

                      <div className="left-container label-required">
                        <label
                          htmlFor="grocery-quantity"
                          className="form-label"
                        >
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
                          value={groceryFormData.quantity}
                          placeholder="e.g., 5units, 500g, 1Kg"
                        />
                      </div>

                      <SelectGroceryCategory
                        handleChange={handleChange}
                        selectedCategory={groceryFormData.categoryId}
                      />
                    </div>

                    <div className="centered-container add-item-btns">
                      <button type="submit" className="btn submit">
                        Submit
                      </button>
                      <button className="btn cancel" onClick={clearData}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </section>
              </main>
            }
          />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default AddItem;
