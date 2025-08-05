import { useContext, useState } from "react";
import { Link } from "react-router";
import {
  IoIosAddCircle,
  MdDelete,
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
  MdEdit,
} from "../../../utils/icons";
import { GroceriesContext } from "./Groceries";
import { AuthContext } from "../../../App";
import { checkItemById } from "../js/items_firebase";
import Footer from "../../Static/Footer";
import LinkButton from "../../Elements/LinkButton";
import Loading from "../../Elements/Loading";

/**
 * Renders groceries list table with items
 */
function GroceriesList() {
  const {
    groceriesList,
    isLoadingData,
    isGroceriesListEmpty,
    setGroceriesList,
  } = useContext(GroceriesContext);
  const { setIsNavHidden } = useContext(AuthContext);

  const [error, setError] = useState(null);

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
            <header className="header groceries">
              <h1>{groceriesList.name}</h1>
            </header>

            <section>
              <p className="groceries-description">
                {groceriesList.description}
              </p>

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
                  <div className="column-container category">Category</div>
                  <div className="column-container itemName">Item</div>
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
