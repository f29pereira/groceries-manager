import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../App";
import { fetchGroceryList } from "./js/groceries_firebase";
import Loading from "../Elements/Loading";

function GroceriesList() {
  const { currentUser } = useContext(AuthContext);

  const [itemsList, setItemsList] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [isGroceriesEmpty, setIsGroceriesEmpty] = useState(false);

  useEffect(() => {
    const getGroceryList = () => {
      fetchGroceryList(currentUser.uid)
        .then((data) => {
          setLoadingData(false);
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
      <header className="header">
        <h1>Groceries List</h1>
      </header>

      <section>
        <Link to="/addItem" className="submit-btn">
          Add Item
        </Link>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {loadingData ? (
              <tr>
                <td>
                  <Loading>Loading grocery list</Loading>
                </td>
              </tr>
            ) : isGroceriesEmpty ? (
              <tr>
                <td>No data</td>
              </tr>
            ) : (
              itemsList.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>
                    <span
                      className="item-category"
                      style={{ backgroundColor: item.categoryColor }}
                    >
                      {item.categoryName}
                    </span>
                  </td>
                  <td>{item.quantity}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default GroceriesList;
