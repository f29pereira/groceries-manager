import { useContext, useState } from "react";
import { AuthContext } from "../../../../App";
import { ListContext } from "../../List";
import { useNavigate } from "react-router";
import { handleInputChange, showError } from "../../../../utils/utils";
import { addEmptyGroceryList } from "../../js/groceries_firebase";
import { IoAdd } from "../../../../utils/icons";
import Card from "../../../Elements/Card";
import GroceriesListForm from "./GroceriesListForm";
import Footer from "../../../Static/Footer";

/**
 * Renders the form to create a new Grocery List
 */
function AddGroceriesList() {
  const { currentUser, setIsNavHidden } = useContext(AuthContext);
  const { userLists, setUserLists, isListEmpty, setIsListEmpty } =
    useContext(ListContext);
  const navigate = useNavigate();

  const [listFormData, setListFormData] = useState({
    name: "",
    description: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (event) => {
    handleInputChange(event, setListFormData);
  };

  const addList = (event) => {
    event.preventDefault();

    addEmptyGroceryList(currentUser.uid, listFormData, userLists)
      .then((groceriesList) => {
        setUserLists(groceriesList);
        if (isListEmpty) {
          setIsListEmpty(false);
        }
        navigate(-1);
      })
      .catch((error) => {
        setIsNavHidden(true);
        setError(error);
      });
  };

  const clearData = () => {
    setListFormData({ name: "", description: "" });
  };

  if (error) {
    console.log(error);
    throw error; //error to be caught by ErrorBoundary
  }

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
                handleChange={handleChange}
                formData={listFormData}
                handleCancel={clearData}
              />
            }
          ></Card>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default AddGroceriesList;
