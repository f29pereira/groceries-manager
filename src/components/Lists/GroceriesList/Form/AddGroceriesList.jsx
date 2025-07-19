import { useContext, useState } from "react";
import { AuthContext } from "../../../../App";
import { useNavigate } from "react-router";
import { handleInputChange, showError } from "../../../../utils/utils";
import { addEmptyGroceryList } from "../../js/groceries_firebase";
import { IoAdd } from "../../../../utils/icons";
import Card from "../../../Elements/Card";
import GroceriesListForm from "./GroceriesListForm";

/**
 * Renders the form to create a new Grocery List
 */
function AddGroceriesList() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [listFormData, setListFormData] = useState({
    name: "",
    description: "",
  });

  const [errorMsg, setErrorMsg] = useState({
    generic: "",
  });

  const handleChange = (event) => {
    handleInputChange(event, setListFormData);
  };

  const addList = (event) => {
    event.preventDefault();

    addEmptyGroceryList(currentUser.uid, listFormData)
      .then(() => {
        navigate("/myLists");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clearData = () => {
    setListFormData({ name: "", description: "" });
  };

  return (
    <>
      <main>
        <div className="content card">
          <Card
            showGoBack={true}
            titleIcon={<IoAdd />}
            titleText="Grocery List"
            body={
              <GroceriesListForm
                handleOnSubmit={addList}
                errorMsg={errorMsg}
                handleChange={handleChange}
                formData={listFormData}
                handleCancel={clearData}
              />
            }
          ></Card>
        </div>
      </main>
    </>
  );
}

export default AddGroceriesList;
