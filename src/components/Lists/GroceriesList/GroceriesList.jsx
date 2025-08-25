import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { AuthContext } from "../../../App";
import { ToastContext } from "../../Elements/Toast/ToastProvider";
import {
  IoIosAddCircle,
  MdDelete,
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
  MdEdit,
} from "../../../utils/icons";
import { GroceriesContext } from "./Groceries";
import { checkItemById, getSortedAndCheckedItems } from "../js/items_firebase";
import Footer from "../../Static/Footer";
import LinkButton from "../../Elements/LinkButton";
import Loading from "../../Elements/Loading";
import Toast from "../../Elements/Toast/Toast";
import SortIcon from "../../Elements/SortIcon";
import useSort from "../../customHooks/useSort";
import DateTime from "../../Elements/DateTime";

/**
 * Renders groceries list table with items
 */
function GroceriesList() {
  //useContext Hooks
  const { setIsNavHidden } = useContext(AuthContext);
  const { toast, setToast, clearSuccessToast } = useContext(ToastContext);
  const {
    groceriesList,
    setGroceriesList,
    isLoadingData,
    isGroceriesListEmpty,
  } = useContext(GroceriesContext);

  //useState Hooks
  const [error, setError] = useState(null);

  //useLocation Hook
  const location = useLocation();

  //custom Hooks
  const { sorting: categorySort, toggleSortOrder: categorySortOrder } =
    useSort("category_name");
  const { sorting: itemNameSort, toggleSortOrder: itemNameSortOrder } =
    useSort("name");

  /**
   * Toggles item check
   * @param {string} itemId - item id
   */
  const toggleCheck = (itemId) => {
    checkItemById(itemId, groceriesList.items_list, categorySort, itemNameSort)
      .then((updatedItemsList) => {
        setGroceriesList((prevList) => ({
          ...prevList,
          items_list: updatedItemsList,
        }));
      })
      .catch((error) => {
        setIsNavHidden(true);
        setError(error);
      });
  };

  /**
   * Toggles the sorting order for given column
   * @param {string} column_name - column name to toggle sort
   */
  const toggleColumnSort = (column_name) => {
    if (column_name === "category") {
      categorySortOrder();
    } else if (column_name === "itemName") {
      itemNameSortOrder();
    }
  };

  //useEffect Hooks
  //clears toast notification after 5 seconds
  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        clearSuccessToast();
      }, 5000);
    }
  }, [toast]);

  //updates groceries list sort order when categorySort/itemNameSort changes value
  useEffect(() => {
    if (groceriesList?.items_list.length) {
      try {
        const sortedItems = getSortedAndCheckedItems(
          groceriesList.items_list,
          { column_name: categorySort.column_name, order: categorySort.order },
          { column_name: itemNameSort.column_name, order: itemNameSort.order }
        );

        const groceriesListData = {
          ...groceriesList,
          items_list: sortedItems,
        };

        setGroceriesList(groceriesListData);
      } catch (error) {
        setToast({
          type: "error",
          message: "Failed to sort items. Please try again.",
        });
        setIsNavHidden(true);
        setError(error);
      }
    }
  }, [categorySort, itemNameSort]);

  if (error) {
    console.log(error);
    throw error; //error to be caught by ErrorBoundary
  }

  return (
    <main>
      {isLoadingData ? (
        <Loading message="Loading groceries list" />
      ) : (
        <div className="content list">
          <div className="groceries-list-card">
            <div className="toast-header">
              {/*Toast Notification*/}
              <div className="centered-column-container toast">
                {toast && toast?.type === "success" && toast?.message ? (
                  <Toast type={toast.type} message={toast.message} />
                ) : null}
              </div>

              {/*Header*/}
              <header className="title">
                <h1>{groceriesList.name}</h1>
              </header>
            </div>

            <div className="groceries-date-time">
              {/*Groceries Date/Time added*/}
              <DateTime
                date={groceriesList.created_at_date}
                time={groceriesList.created_at_time}
              />
            </div>

            <section className="groceries-info">
              <p>{groceriesList.description}</p>
            </section>

            {/*Update Groeries List*/}
            <div className="right-container">
              <LinkButton
                path={`/myLists/groceryList/${groceriesList.index}/edit`}
                classNames="yellow"
                name="Edit"
                icon={<MdEdit />}
                title="Edit Groceries List"
              />
            </div>
          </div>

          <section>
            <div className="space-between-container counter-add-list">
              {/*Items Counter*/}
              <div className="counter-list">
                <h2 className="counter">
                  Items Count: <span>{groceriesList?.items_count}</span>
                </h2>
              </div>

              {/*Add Item to Groceries List*/}
              <div className="centered-container">
                <LinkButton
                  path={`/myLists/groceryList/${groceriesList.index}/addItem`}
                  classNames="green"
                  icon={<IoIosAddCircle />}
                  name="Add Item"
                />
              </div>
            </div>

            {/*Groceries List Table*/}
            <div className="table">
              <div className="row-container table-header">
                {/*Category Header Column*/}
                <div className="column-container category">
                  <div className="left-container gap">
                    Category
                    {groceriesList?.items_count > 1 ? (
                      <div
                        className="column-container"
                        onClick={() => {
                          toggleColumnSort("category");
                        }}
                      >
                        <SortIcon order={categorySort.order} />
                      </div>
                    ) : null}
                  </div>
                </div>

                {/*Item Name Header Column*/}
                <div className="column-container itemName">
                  <div className="left-container gap">
                    Item
                    {groceriesList?.items_count > 1 ? (
                      <div
                        className="column-container"
                        onClick={() => {
                          toggleColumnSort("itemName");
                        }}
                      >
                        <SortIcon order={itemNameSort.order} />
                      </div>
                    ) : null}
                  </div>
                </div>

                {/*Item Quantity Header Column*/}
                <div className="column-container itemQuantity">Qty</div>

                {/*Item User Actions Header Column*/}
                <div className="column-container itemActions">Actions</div>
              </div>

              {isGroceriesListEmpty ? (
                <div className="row-container no-data">
                  This list has no items.
                </div>
              ) : (
                groceriesList.items_list.map((item, index) => (
                  <div
                    key={index}
                    className={`row-container data ${
                      item.isChecked ? "checked" : ""
                    }`}
                  >
                    {/*Item Category Data Column*/}
                    <div className="column-container category">
                      <span
                        className="item-category"
                        style={{
                          backgroundColor: item.isChecked
                            ? "#d3d3d3"
                            : item.category_color,
                        }}
                      >
                        {item.category_name}
                      </span>
                    </div>

                    {/*Item Name Data Column*/}
                    <div className="column-container itemName">
                      <span className={`${item.isChecked ? "checked" : ""}`}>
                        {item.name}
                      </span>
                    </div>

                    {/*Item Quantity Data Column*/}
                    <div className="column-container itemQuantity">
                      <span className={`${item.isChecked ? "checked" : ""}`}>
                        {item.quantity}
                      </span>
                    </div>

                    {/*Item User Actions Data Column*/}
                    <div className="column-container itemActions">
                      <div className="actions-container">
                        <button
                          title="Check Item"
                          className="check-item"
                          onClick={() => {
                            toggleCheck(item.id);
                          }}
                        >
                          {item.isChecked ? (
                            <MdOutlineCheckBox />
                          ) : (
                            <MdOutlineCheckBoxOutlineBlank />
                          )}
                        </button>

                        <Link
                          to={`editItem/${index}`}
                          title="Edit Item"
                          state={{
                            itemId: item.id,
                          }}
                          className={`${item.isChecked ? "checked" : ""}`}
                        >
                          <MdEdit className="edit-icon" />
                        </Link>

                        <Link
                          to={`removeItem/${index}`}
                          title="Remove Item"
                          state={{
                            itemId: item.id,
                          }}
                          className={`${item.isChecked ? "checked" : ""}`}
                        >
                          <MdDelete className="delete-icon" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      )}
      <Footer />
    </main>
  );
}

export default GroceriesList;
