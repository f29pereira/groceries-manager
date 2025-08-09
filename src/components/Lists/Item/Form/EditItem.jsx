import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { handleInputChange, showError } from "../../../../utils/utils";
import { getItemById, updateItemById } from "../../js/items_firebase";
import { MdEdit } from "../../../../utils/icons";
import { AuthContext } from "../../../../App";
import { GroceriesContext } from "../../GroceriesList/Groceries";
import { ToastContext } from "../../../Elements/Toast/ToastProvider";
import Card from "../../../Elements/Card";
import ItemForm from "./ItemForm";
import Footer from "../../../Static/Footer";

/**
 * Updates item from a groceries list
 */
function EditItem() {
  //useContext Hooks
  const { setIsNavHidden } = useContext(AuthContext);
  const { setToast } = useContext(ToastContext);
  const { groceriesList, setGroceriesList } = useContext(GroceriesContext);

  //useState Hooks
  const [editItemFormData, setEditItemFormData] = useState({
    name: "",
    quantity: "",
    category_id: "",
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //React Router Hooks
  const location = useLocation();
  const navigate = useNavigate();

  //useEffect Hook
  useEffect(() => {
    const setItemData = () => {
      try {
        const itemData = getItemById(
          location.state?.itemId,
          groceriesList.items_list
        );

        setEditItemFormData(itemData);
      } catch (error) {
        setIsNavHidden(true);
        setError(error);
      }
    };

    setItemData();
  }, []);

  const handleChange = (event) => {
    handleInputChange(event, setEditItemFormData);
  };

  const editItem = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

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

        setToast({
          type: "success",
          message: "Item updated successfully",
        });
        navigate(-1);
      })
      .catch((error) => {
        setToast({
          type: "error",
          message:
            "Failed to edit item from your grocery list. Please try again.",
        });
        setIsNavHidden(true);
        setError(error);
      })
      .finally(() => {
        setIsSubmitting(false);
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
            titleText="Item"
            body={
              <ItemForm
                handleOnSubmit={editItem}
                handleChange={handleChange}
                formData={editItemFormData}
                handleCancel={goBack}
                isSubmitting={isSubmitting}
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
