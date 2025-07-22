import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { handleInputChange } from "../../../../utils/utils";
import {
  fetchGroceryListNameDescById,
  updateGroceryListById,
} from "../../js/groceries_firebase";
import { FaEdit } from "../../../../utils/icons";
import Card from "../../../Elements/Card";
import GroceriesListForm from "./GroceriesListForm";

/**
 * Renders the form to update the Grocery List name/description fields
 */
function EditGroceriesList() {
  const location = useLocation();
  const navigate = useNavigate();

  const [listFormData, setListFormData] = useState({
    name: "",
    description: "",
  });

  const [isLoadingData, setIsLoadingData] = useState(true);

  const [errorMsg, setErrorMsg] = useState({
    generic: "",
  });

  useEffect(() => {
    const getGroceryListData = () => {
      fetchGroceryListNameDescById(location.state?.id)
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

  const updateGroceryList = (event) => {
    event.preventDefault();

    updateGroceryListById(location.state?.id, listFormData)
      .then(() => {
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
                handleOnSubmit={updateGroceryList}
                errorMsg={errorMsg}
                handleChange={handleChange}
                formData={listFormData}
                handleCancel={goBack}
              />
            }
          ></Card>
        </div>
      </main>
    </>
  );
}

export default EditGroceriesList;
