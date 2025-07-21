import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { AuthContext } from "../../../App";
import { fetchGroceryListById } from "../js/groceries_firebase";
import { IoIosAddCircle, MdDelete, FaEdit } from "../../../utils/icons";
import Loading from "../../Elements/Loading";
import Footer from "../../Static/Footer";
import LinkButton from "../../Elements/LinkButton";

function GroceriesList() {
  const location = useLocation();

  const [groceriesList, setGroceriesList] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isGroceriesListEmpty, setIsGroceryListEmpty] = useState(false);

  useEffect(() => {
    const getGroceryList = () => {
      fetchGroceryListById(location.state?.id)
        .then((data) => {
          setIsLoadingData(false);
          if (data.length !== 0) {
            setGroceriesList(data);
          }

          if (data.items.length === 0) {
            setIsGroceryListEmpty(true);
          }
        })
        .catch((error) => console.log(error));
    };

    getGroceryList();
  }, []);

  return (
    <>
      <main>
        <div className="content list">
          <header className="header groceries">
            <h1>{groceriesList.name}</h1>
          </header>

          <section>
            <div className="centered-container">
              <LinkButton
                path={`/myLists/groceryList/${location.state?.index}/addItem`}
                classNames="green"
                icon={<IoIosAddCircle />}
                name="Add Item"
                state={{ id: location.state?.id }}
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
                groceriesList.items.map((item, index) => (
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
                          id: item.id,
                        }}
                      >
                        <MdDelete className="delete-icon" />
                      </Link>

                      <Link
                        to={`editItem/${index}`}
                        title="Edit Item"
                        state={{
                          id: item.id,
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
