import { useState, useEffect, useContext } from "react";
import { GroceriesContext } from "../Groceries";
import { AuthContext } from "../../../../App";
import { useNavigate } from "react-router";
import { handleInputChange } from "../../../../utils/utils";
import {
  fetchGroceryListNameDescById,
  updateGroceryList,
} from "../../js/groceries_firebase";
import { FaEdit } from "../../../../utils/icons";
import Card from "../../../Elements/Card";
import GroceriesListForm from "./GroceriesListForm";
import Footer from "../../../Static/Footer";

/**
 * Renders the form to update the grocery list name/description fields
 */
function EditGroceriesList() {
  const { groceriesList, isLoadingData, setIsLoadingData, setGroceriesList } =
    useContext(GroceriesContext);
  const { setIsNavHidden } = useContext(AuthContext);

  const navigate = useNavigate();

  const [listFormData, setListFormData] = useState({
    name: "",
    description: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const getGroceryListData = () => {
      fetchGroceryListNameDescById(groceriesList.id)
        .then((data) => {
          setListFormData(data);
        })
        .catch((error) => {
          setIsNavHidden(true);
          setError(error);
        })
        .finally(setIsLoadingData(false));
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
            titleIcon={<FaEdit />}
            titleText="Grocery List"
            isLoading={isLoadingData}
            body={
              <GroceriesListForm
                handleOnSubmit={editGroceryList}
                errorMsg={errorMsg}
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
