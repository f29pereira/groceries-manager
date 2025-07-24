import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { handleInputChange } from "../../../../utils/utils";
import {
  fetchGroceryListNameDescById,
  updateGroceryList,
} from "../../js/groceries_firebase";
import { FaEdit } from "../../../../utils/icons";
import Card from "../../../Elements/Card";
import GroceriesListForm from "./GroceriesListForm";
import Footer from "../../../Static/Footer";
import { GroceriesContext } from "../Groceries";

/**
 * Renders the form to update the grocery list name/description fields
 */
function EditGroceriesList() {
  const { groceriesList, isLoadingData, setIsLoadingData, setGroceriesList } =
    useContext(GroceriesContext);

  const navigate = useNavigate();

  const [listFormData, setListFormData] = useState({
    name: "",
    description: "",
  });

  const [errorMsg, setErrorMsg] = useState({
    generic: "",
  });

  useEffect(() => {
    const getGroceryListData = () => {
      fetchGroceryListNameDescById(groceriesList.id)
        .then((data) => {
          setIsLoadingData(false);
          setListFormData(data);
        })
        .catch((error) => console.log(error));
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
      .catch((error) => console.log(error));
  };

  const goBack = () => {
    navigate(-1);
  };

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
