import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../App";
import { ToastContext } from "../../../Elements/Toast/ToastProvider";
import { ListContext } from "../../List";
import { GroceriesContext } from "../Groceries";
import { useNavigate } from "react-router";
import { handleInputChange } from "../../../../utils/utils";
import {
  updateGroceryList,
  updateUserLists,
} from "../../js/groceries_firebase";
import { MdEdit } from "../../../../utils/icons";
import Card from "../../../Elements/Card";
import GroceriesListForm from "./GroceriesListForm";
import Toast from "../../../Elements/Toast/Toast";
import Footer from "../../../Static/Footer";

/**
 * Renders the form to update the groceries list name/description fields
 */
function EditGroceriesList() {
  //useContext Hooks
  const { setIsNavHidden } = useContext(AuthContext);
  const { setToast } = useContext(ToastContext);
  const { userLists, setUserLists } = useContext(ListContext);
  const { groceriesList, setGroceriesList } = useContext(GroceriesContext);

  //useState Hooks
  const [listFormData, setListFormData] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState(null);

  //useNavigate Hook
  const navigate = useNavigate();

  //useEffect Hook
  useEffect(() => {
    const getGroceryListData = () => {
      const data = {
        name: groceriesList.name,
        description: groceriesList.description,
      };

      setListFormData(data);
    };

    getGroceryListData();
  }, []);

  const handleChange = (event) => {
    handleInputChange(event, setListFormData);
  };

  const editGroceryList = (event) => {
    event.preventDefault();

    updateGroceryList(groceriesList, listFormData)
      .then((updatedGroceriesList) => {
        setGroceriesList(updatedGroceriesList);
        return updateUserLists(updatedGroceriesList, userLists);
      })
      .then((listToUpdate) => {
        setUserLists(listToUpdate);
        setToast(
          <Toast type="success" message="Groceries list updated successfully" />
        );
        navigate(-1);
      })
      .catch((error) => {
        setIsNavHidden(true);
        setError(error);
      });
  };

  const goBack = () => {
    navigate(-1);
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
            titleIcon={<MdEdit />}
            titleText="Grocery List"
            body={
              <GroceriesListForm
                handleOnSubmit={editGroceryList}
                handleChange={handleChange}
                formData={listFormData}
                handleCancel={goBack}
              />
            }
          ></Card>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default EditGroceriesList;
