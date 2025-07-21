import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { handleInputChange, showError } from "../../../../utils/utils";
import { IoAdd } from "../../../../utils/icons";
import Card from "../../../Elements/Card";
import { addItem } from "../../js/items_firebase";
import ItemForm from "./ItemForm";
import Footer from "../../../Static/Footer";

function AddItem() {
  const navigate = useNavigate();
  const location = useLocation();

  const [itemFormData, setItemFormData] = useState({
    name: "",
    quantity: "",
    categoryId: "",
  });

  const [errorMsg, setErrorMsg] = useState({
    generic: "",
  });

  const handleChange = (event) => {
    handleInputChange(event, setItemFormData);
  };

  const addItemToGroceryList = (event) => {
    event.preventDefault();

    addItem(location.state?.id, itemFormData)
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        console.log(error);
        showError(error, setErrorMsg);
      });
  };

  const clearData = () => {
    setItemFormData({ name: "", quantity: "", categoryId: "" });
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
              <ItemForm
                handleOnSubmit={addItemToGroceryList}
                errorMsg={errorMsg}
                handleChange={handleChange}
                formData={itemFormData}
                handleCancel={clearData}
              />
            }
          />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default AddItem;
