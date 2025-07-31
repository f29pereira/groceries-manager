import { useContext, useEffect, useState } from "react";
import { GroceriesContext } from "../GroceriesList/Groceries";
import { ListContext } from "../List";
import { AuthContext } from "../../../App";
import { useLocation, useNavigate } from "react-router";
import { getItemById, removeItemById } from "../js/items_firebase";
import { MdDelete } from "../../../utils/icons";
import Card from "../../Elements/Card";
import Footer from "../../Static/Footer";

function RemoveItem() {
  const { groceriesList, setGroceriesList, setIsGroceryListEmpty } =
    useContext(GroceriesContext);
  const { setUserLists } = useContext(ListContext);
  const { setIsNavHidden } = useContext(AuthContext);

  const [itemToRemove, setItemToRemove] = useState({});
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

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
    removeItemById(
      location.state?.itemId,
      groceriesList.id,
      groceriesList.items_list
    )
      .then((updatedItemsList) => {
        //decrement itemCount in userLists List state
        setUserLists((prevUserList) =>
          prevUserList.map((list) =>
            list.id === groceriesList.id
              ? { ...list, itemCount: list.itemCount - 1 }
              : list
          )
        );

        setGroceriesList((prevList) => ({
          ...prevList,
          items_list: updatedItemsList,
          itemsCount: prevList.itemsCount - 1,
        }));

        if (updatedItemsList.length === 0) {
          setIsGroceryListEmpty(true);
        }

        navigate(-1);
      })
      .catch((error) => {
        setIsNavHidden(true);
        setError(error);
      });
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
                  >
                    Confirm
                  </button>
                  <button className="btn red" onClick={handleGoBack}>
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
