import { useContext, useState } from "react";
import { AuthContext } from "../../../../App";
import { ToastContext } from "../../../Elements/Toast/ToastProvider";
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
  //useContext Hooks
  const { currentUser, setIsNavHidden } = useContext(AuthContext);
  const { setToast } = useContext(ToastContext);
  const { userLists, setUserLists, isListEmpty, setIsListEmpty } =
    useContext(ListContext);
  const navigate = useNavigate();

  //useState Hooks
  const [listFormData, setListFormData] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    handleInputChange(event, setListFormData);
  };

  const addList = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    addEmptyGroceryList(currentUser.uid, listFormData, userLists)
      .then((groceriesList) => {
        setUserLists(groceriesList);
        if (isListEmpty) {
          setIsListEmpty(false);
        }

        setToast({
          type: "success",
          message: "Groceries list added successfully",
        });
        navigate(-1);
      })
      .catch((error) => {
        setToast({
          type: "error",
          message: "Failed to add groceries list. Please try again.",
        });
        setIsNavHidden(true);
        setError(error);
      })
      .finally(() => {
        setIsSubmitting(false);
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
                isSubmitting={isSubmitting}
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
