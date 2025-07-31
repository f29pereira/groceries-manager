import { useContext } from "react";
import { Link } from "react-router";
import { IoIosAddCircle, MdDelete, FaEdit } from "../../../utils/icons";
import { GroceriesContext } from "./Groceries";
import Footer from "../../Static/Footer";
import LinkButton from "../../Elements/LinkButton";
import Loading from "../../Elements/Loading";

/**
 * Renders grocery list table
 */
function GroceriesList() {
  const { groceriesList, isLoadingData, isGroceriesListEmpty } =
    useContext(GroceriesContext);

  return (
    <>
      <main>
        {isLoadingData ? (
          <Loading message="Loading groceries list items" />
        ) : (
          <div className="content list">
            <header className="header groceries">
              <h1>{groceriesList.name}</h1>
            </header>

            <section>
              <p className="groceries-description">
                {groceriesList.description}
              </p>

              <div className="centered-container add-item-container">
                <LinkButton
                  path={`/myLists/groceryList/${groceriesList.index}/addItem`}
                  classNames="green"
                  icon={<IoIosAddCircle />}
                  name="Add Item"
                />
              </div>

              <div className="space-between-container groceries-list-btns-container">
                <div className="centered-container">
                  <h2 className="item-count">
                    Items Count: <span>{groceriesList.itemsCount}</span>
                  </h2>
                </div>

                <div className="centered-container edit-delete-container">
                  <LinkButton
                    path={`/myLists/groceryList/${groceriesList.index}/edit`}
                    classNames="yellow edit-delete-btn"
                    icon={<FaEdit />}
                    title="Edit Groceries List"
                  />

                  <LinkButton
                    path={`/myLists/groceryList/${groceriesList.index}/remove`}
                    classNames="red edit-delete-btn"
                    icon={<MdDelete />}
                    title="Remove Groceries List"
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
                    <div key={index} className="row-container data">
                      <div className="column-container category">
                        <span
                          className="item-category"
                          style={{ backgroundColor: item.category_color }}
                        >
                          {item.category_name}
                        </span>
                      </div>
                      <div className="column-container itemName">
                        {item.name}
                      </div>
                      <div className="column-container itemQuantity">
                        {item.quantity}
                      </div>
                      <div className="column-container itemActions">
                        <div className="item-actions-container">
                          <Link
                            to={`editItem/${index}`}
                            title="Edit Item"
                            state={{
                              itemId: item.id,
                            }}
                          >
                            <FaEdit className="edit-icon" />
                          </Link>

                          <Link
                            to={`removeItem/${index}`}
                            title="Remove Item"
                            state={{
                              itemId: item.id,
                            }}
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
