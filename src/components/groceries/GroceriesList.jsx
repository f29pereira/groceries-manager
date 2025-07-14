import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../App";
import { fetchGroceryList } from "./js/groceries_firebase";
import Loading from "../Elements/Loading";
import { IoIosAddCircle, MdDelete } from "../../utils/icons";

function GroceriesList() {
  const { currentUser } = useContext(AuthContext);

  const [itemsList, setItemsList] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isGroceriesEmpty, setIsGroceriesEmpty] = useState(false);

  useEffect(() => {
    const getGroceryList = () => {
      fetchGroceryList(currentUser.uid)
        .then((data) => {
          setIsLoadingData(false);
          if (data.length !== 0) {
            setItemsList(data);
          } else {
            setIsGroceriesEmpty(true);
          }
        })
        .catch((error) => console.log(error));
    };

    getGroceryList();
  }, []);

  return (
    <main className="main">
      <header className="header groceries">
        <h1>Groceries List</h1>
      </header>

      <section>
        <div className="centered-container">
          <Link to="/groceries/addItem" className="btn submit add-item">
            <IoIosAddCircle className="add-item-icon" />
            Add Item
          </Link>
        </div>

        {isGroceriesEmpty ? (
          <div className="groceries-row-container centered">
            <div className="no-list">
              Groceries List not created yet, add a item to create it.
            </div>
          </div>
        ) : (
          <>
            {isLoadingData ? null : (
              <div className="item-count-container">
                <div className="item-count">
                  Total Count:<span>{itemsList.length}</span>
                </div>
              </div>
            )}

            <div className="groceries-list">
              <div className="groceries-row-container groceries-header">
                <div className="groceries-column-container category">
                  Category
                </div>
                <div className="groceries-column-container groceryItem">
                  Item
                </div>
                <div className="groceries-column-container quantity">
                  Quantity
                </div>
                <div className="groceries-column-container actions">
                  Actions
                </div>
              </div>

              {isLoadingData ? (
                <div className="groceries-row-container centered">
                  <Loading>Loading grocery list</Loading>
                </div>
              ) : (
                itemsList.map((item, index) => (
                  <div
                    key={index}
                    className="groceries-row-container item-data"
                  >
                    <div className="groceries-column-container category">
                      <span
                        className="item-category"
                        style={{ backgroundColor: item.categoryColor }}
                      >
                        {item.categoryName}
                      </span>
                    </div>
                    <div className="groceries-column-container groceryItem">
                      {item.name}
                    </div>
                    <div className="groceries-column-container quantity">
                      {item.quantity}
                    </div>
                    <div className="groceries-column-container actions">
                      <Link
                        to={`/groceries/removeItem/${item.id}`}
                        state={{
                          categoryId: item.categoryId,
                          categoryColor: item.categoryColor,
                          categoryName: item.categoryName,
                          name: item.name,
                          quantity: item.quantity,
                        }}
                        title="Remove Item"
                      >
                        <MdDelete className="remove-item-icon" />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default GroceriesList;
