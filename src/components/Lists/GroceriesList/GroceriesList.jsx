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
import { checkItemById, sortItems } from "../js/items_firebase";
import Footer from "../../Static/Footer";
import LinkButton from "../../Elements/LinkButton";
import Loading from "../../Elements/Loading";
import Toast from "../../Elements/Toast/Toast";
import SortIcon from "../../Elements/SortIcon";
import useSort from "../../customHooks/useSort";

/**
 * Renders groceries list table with items
 */
function GroceriesList() {
  //useContext Hooks
  const { setIsNavHidden } = useContext(AuthContext);
  const { toast, clearSuccessToast } = useContext(ToastContext);
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
    useSort("category");
  const { sorting: itemNameSort, toggleSortOrder: itemNameSortOrder } =
    useSort("itemName");

  /**
   * Toggles item check
   * @param {string} itemId - item id
   */
  const toggleCheck = (itemId) => {
    checkItemById(itemId, groceriesList.items_list)
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
  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        clearSuccessToast();
      }, 5000);
    }
  }, [toast]);

  useEffect(() => {
    if (groceriesList?.items_list.length) {
      try {
        const sortedItems = sortItems(
          groceriesList.items_list,
          categorySort.order,
          itemNameSort.order
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
    <>
      <main>
        {isLoadingData ? (
          <Loading message="Loading groceries list" />
        ) : (
          <div className="content list">
            <div className="toast-header-container">
              <header className="header groceries">
                <h1>{groceriesList.name}</h1>
              </header>

              <div className="centered-container">
                {toast && toast?.type === "success" && toast?.message ? (
                  <Toast type={toast.type} message={toast.message} />
                ) : null}
              </div>
            </div>

            <section className="groceries-info">
              <p>{groceriesList.description}</p>
              <p>Created at: {groceriesList.created_at}</p>
            </section>

            <section>
              <div className="centered-container add-container">
                <LinkButton
                  path={`/myLists/groceryList/${groceriesList.index}/addItem`}
                  classNames="green"
                  icon={<IoIosAddCircle />}
                  name="Add Item"
                />
              </div>

              <div className="space-between-container counter-list">
                <div className="centered-container">
                  <h2 className="counter">
                    Items Count: <span>{groceriesList.items_count}</span>
                  </h2>
                </div>

                <div className="centered-container edit-delete-container">
                  <LinkButton
                    path={`/myLists/groceryList/${groceriesList.index}/edit`}
                    classNames="yellow edit-delete-btn"
                    icon={<MdEdit />}
                    title="Edit Groceries List"
                  />
                </div>
              </div>

              <div className="table">
                <div className="row-container table-header">
                  <div className="column-container category">
                    <div className="centered-container">
                      Category
                      <div
                        className="column-container"
                        onClick={() => {
                          toggleColumnSort("category");
                        }}
                      >
                        <SortIcon order={categorySort.order} />
                      </div>
                    </div>
                  </div>
                  <div className="column-container itemName">
                    <div className="centered-container">
                      Item
                      <div
                        className="column-container"
                        onClick={() => {
                          toggleColumnSort("itemName");
                        }}
                      >
                        <SortIcon order={itemNameSort.order} />
                      </div>
                    </div>
                  </div>
                  <div className="column-container itemQuantity">Qty</div>
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
                      <div className="column-container itemName">
                        <span className={`${item.isChecked ? "checked" : ""}`}>
                          {item.name}
                        </span>
                      </div>
                      <div className="column-container itemQuantity">
                        <span className={`${item.isChecked ? "checked" : ""}`}>
                          {item.quantity}
                        </span>
                      </div>
                      <div className="column-container itemActions">
                        <div className="actions-container">
                          <button
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
      </main>

      <Footer />
    </>
  );
}

export default GroceriesList;
