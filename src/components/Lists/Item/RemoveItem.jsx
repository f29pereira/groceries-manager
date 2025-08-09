import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../App";
import { ToastContext } from "../../Elements/Toast/ToastProvider";
import { ListContext } from "../List";
import { GroceriesContext } from "../GroceriesList/Groceries";
import { useLocation, useNavigate } from "react-router";
import { getItemById, removeItemById } from "../js/items_firebase";
import { MdDelete, BsThreeDots } from "../../../utils/icons";
import Card from "../../Elements/Card";
import Footer from "../../Static/Footer";

/**
 * Removes item from a groceries list
 */
function RemoveItem() {
  //useContext Hooks
  const { setIsNavHidden } = useContext(AuthContext);
  const { setToast } = useContext(ToastContext);
  const { setUserLists } = useContext(ListContext);
  const { groceriesList, setGroceriesList, setIsGroceryListEmpty } =
    useContext(GroceriesContext);

  //useState Hooks
  const [itemToRemove, setItemToRemove] = useState({});
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  //React Router Hooks
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const setItemData = () => {
      try {
        const itemData = getItemById(
          location.state?.itemId,
          groceriesList.items_list
        );

        setItemToRemove(itemData);
      } catch (error) {
        setIsNavHidden(true);
        setError(error);
      }
    };

    setItemData();
  }, []);

  const removeItemFromGroceryList = () => {
    setIsDeleting(true);

    removeItemById(
      location.state?.itemId,
      groceriesList.id,
      groceriesList.items_list
    )
      .then((updatedItemsList) => {
        //decrement items_count in userLists List state
        setUserLists((prevUserList) =>
          prevUserList.map((list) =>
            list.id === groceriesList.id
              ? { ...list, items_count: list.items_count - 1 }
              : list
          )
        );

        setGroceriesList((prevList) => ({
          ...prevList,
          items_list: updatedItemsList,
          items_count: prevList.items_count - 1,
        }));

        if (updatedItemsList.length === 0) {
          setIsGroceryListEmpty(true);
        }

        setToast({
          type: "success",
          message: "Item removed successfully",
        });
        navigate(-1);
      })
      .catch((error) => {
        setToast({
          type: "error",
          message:
            "Failed to remove item from your grocery list. Please try again.",
        });
        setIsNavHidden(true);
        setError(error);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (error) {
    console.log(error);
    throw error; //error to be caught by ErrorBoundary
  }

  return (
    <>
      <main>
        <div className="content">
          <Card
            showGoBack={true}
            titleIcon={<MdDelete />}
            titleText="Item"
            body={
              <>
                <h2 className="remove-question">
                  Do you wish to remove this item from
                  <span> {groceriesList.name}</span> ?
                </h2>

                <div className="centered-container remove-container">
                  <div className="remove-grid remove-item-col-rows">
                    <h3>Category:</h3>
                    <span
                      className="item-category remove-item"
                      style={{
                        backgroundColor: itemToRemove.category_color,
                      }}
                    >
                      {itemToRemove.category_name}
                    </span>
                    <h3>Item:</h3>
                    {itemToRemove.name}
                    <h3>Quantity:</h3>
                    {itemToRemove.quantity}
                  </div>
                </div>

                <div className="centered-container submit-cancel-btns">
                  <button
                    className="btn green"
                    onClick={removeItemFromGroceryList}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <div className="centered-container">
                        Deleting Item
                        <BsThreeDots className="submitting-icon" />
                      </div>
                    ) : (
                      "Confirm"
                    )}
                  </button>
                  <button
                    className="btn red"
                    onClick={handleGoBack}
                    disabled={isDeleting}
                  >
                    Cancel
                  </button>
                </div>
              </>
            }
          />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default RemoveItem;
