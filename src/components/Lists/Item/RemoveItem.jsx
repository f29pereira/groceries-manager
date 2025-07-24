import { useContext, useEffect, useState } from "react";
import { GroceriesContext } from "../GroceriesList/Groceries";
import { ListContext } from "../List";
import { useLocation, useNavigate } from "react-router";
import { getItemById, removeItemById } from "../js/items_firebase";
import { MdDelete } from "../../../utils/icons";
import Card from "../../Elements/Card";
import Footer from "../../Static/Footer";

function RemoveItem() {
  const { groceriesList, setGroceriesList, setIsGroceryListEmpty } =
    useContext(GroceriesContext);

  const { setUserLists } = useContext(ListContext);

  const [itemToRemove, setItemToRemove] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const setItemData = () => {
      const itemData = getItemById(
        location.state?.itemId,
        groceriesList.items_list
      );

      setItemToRemove(itemData);
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
      .catch((error) => console.log(error));
  };

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
                <p className="remove-item-question">
                  Do you wish to remove this item from your groceries list ?
                </p>

                <div className="centered-container">
                  <div className="remove-item-container">
                    <div className="centered-container">
                      <div className="groceries-column-container remove-item">
                        <ul>
                          <li className="remove-item-info">Category:</li>
                          <li className="remove-item-info">Item:</li>
                          <li className="remove-item-info">Quantity:</li>
                        </ul>
                      </div>
                      <div className="groceries-column-container remove-item">
                        <ul>
                          <li className="remove-item-info">
                            <span
                              className="item-category"
                              style={{
                                backgroundColor: itemToRemove.category_color,
                              }}
                            >
                              {itemToRemove.category_name}
                            </span>
                          </li>
                          <li className="remove-item-info">
                            {itemToRemove.name}
                          </li>
                          <li className="remove-item-info">
                            {itemToRemove.quantity}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="centered-container remove-item-btns">
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
