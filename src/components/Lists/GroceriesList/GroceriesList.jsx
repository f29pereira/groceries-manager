import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../../App";
import { fetchGroceryListById } from "../js/groceries_firebase";
import { IoIosAddCircle, MdDelete, FaEdit } from "../../../utils/icons";
import Loading from "../../Elements/Loading";
import Footer from "../../Static/Footer";
import LinkButton from "../../Elements/LinkButton";

import { GroceriesContext } from "./Groceries";

function GroceriesList() {
  const { groceriesList, isLoadingData, isGroceriesListEmpty } =
    useContext(GroceriesContext);

  return (
    <>
      <main>
        <div className="content list">
          <header className="header groceries">
            <h1>{groceriesList.name}</h1>
          </header>

          <p>{groceriesList.description}</p>

          <section>
            <div className="centered-container">
              <h2>
                Items Count: <span>{groceriesList.itemsCount}</span>
              </h2>

              <LinkButton
                path={`/myLists/groceryList/${groceriesList.index}/edit`}
                classNames="yellow"
                icon={<FaEdit />}
                name="Edit"
              />

              <LinkButton
                path={`/myLists/groceryList/${groceriesList.index}/remove`}
                classNames="red"
                icon={<MdDelete />}
                name="Remove"
              />

              <LinkButton
                path={`/myLists/groceryList/${groceriesList.index}/addItem`}
                classNames="green"
                icon={<IoIosAddCircle />}
                name="Add Item"
              />
            </div>

            <div className="table">
              <div className="row-container table-header">
                <div className="column-container category">Category</div>
                <div className="column-container itemName">Item</div>
                <div className="column-container itemQuantity">Quantity</div>
                <div className="column-container itemActions">User Actions</div>
              </div>

              {isLoadingData ? (
                <div className="row-container no-data">
                  <Loading>Loading your items</Loading>
                </div>
              ) : isGroceriesListEmpty ? (
                <div className="row-container no-data">
                  This list has no items.
                </div>
              ) : (
                groceriesList.items_list.map((item, index) => (
                  <div key={index} className="row-container">
                    <div className="column-container category">
                      <span
                        className="item-category"
                        style={{ backgroundColor: item.category_color }}
                      >
                        {item.category_name}
                      </span>
                    </div>
                    <div className="column-container itemName">{item.name}</div>
                    <div className="column-container itemQuantity">
                      {item.quantity}
                    </div>
                    <div className="column-container itemActions">
                      <Link
                        to={`removeItem/${index}`}
                        title="Remove Item"
                        state={{
                          itemId: item.id,
                        }}
                      >
                        <MdDelete className="delete-icon" />
                      </Link>

                      <Link
                        to={`editItem/${index}`}
                        title="Edit Item"
                        state={{
                          itemId: item.id,
                        }}
                      >
                        <FaEdit className="edit-icon" />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default GroceriesList;
