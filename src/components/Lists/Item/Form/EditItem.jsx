import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { handleInputChange, showError } from "../../../../utils/utils";
import { getItemById, updateItemById } from "../../js/items_firebase";
import { FaEdit } from "../../../../utils/icons";
import { GroceriesContext } from "../../GroceriesList/Groceries";
import Card from "../../../Elements/Card";
import ItemForm from "./ItemForm";
import Footer from "../../../Static/Footer";

function EditItem() {
  const { groceriesList, setGroceriesList } = useContext(GroceriesContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [editItemFormData, setEditItemFormData] = useState({
    name: "",
    quantity: "",
    category_id: "",
  });

  const [errorMsg, setErrorMsg] = useState({
    generic: "",
  });

  const handleChange = (event) => {
    handleInputChange(event, setEditItemFormData);
  };

  useEffect(() => {
    const setItemData = () => {
      const itemData = getItemById(
        location.state?.itemId,
        groceriesList.items_list
      );

      setEditItemFormData(itemData);
    };

    setItemData();
  }, []);

  const editItem = (event) => {
    event.preventDefault();

    updateItemById(
      location.state?.itemId,
      editItemFormData,
      groceriesList.items_list
    )
      .then((updatedItemsList) => {
        setGroceriesList((prevList) => ({
          ...prevList,
          items_list: updatedItemsList,
        }));

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
            titleText="Edit Item"
            body={
              <ItemForm
                handleOnSubmit={editItem}
                errorMsg={errorMsg}
                handleChange={handleChange}
                formData={editItemFormData}
                handleCancel={goBack}
              />
            }
          />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default EditItem;
