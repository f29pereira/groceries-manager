import { useState, useEffect, useContext } from "react";
import { GroceriesContext } from "../Groceries";
import { ListContext } from "../../List";
import { AuthContext } from "../../../../App";
import { useNavigate } from "react-router";
import { handleInputChange } from "../../../../utils/utils";
import {
  updateGroceryList,
  updateUserLists,
} from "../../js/groceries_firebase";
import { MdEdit } from "../../../../utils/icons";
import Card from "../../../Elements/Card";
import GroceriesListForm from "./GroceriesListForm";
import Footer from "../../../Static/Footer";

/**
 * Renders the form to update the groceries list name/description fields
 */
function EditGroceriesList() {
  const { groceriesList, setGroceriesList } = useContext(GroceriesContext);
  const { userLists, setUserLists } = useContext(ListContext);
  const { setIsNavHidden } = useContext(AuthContext);

  const navigate = useNavigate();

  const [listFormData, setListFormData] = useState({
    name: "",
    description: "",
  });

  const [error, setError] = useState(null);

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
