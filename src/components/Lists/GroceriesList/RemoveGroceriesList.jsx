import { useContext } from "react";
import { useNavigate } from "react-router";
import { GroceriesContext } from "./Groceries";
import { ListContext } from "../List";
import { AuthContext } from "../../../App";
import { deleteGroceryListById } from "../js/groceries_firebase";
import { MdDelete } from "../../../utils/icons";
import Card from "../../Elements/Card";
import Footer from "../../Static/Footer";

function RemoveGroceriesList() {
  const { groceriesList, setIsListEmpty } = useContext(GroceriesContext);
  const { userLists, setUserLists } = useContext(ListContext);
  const { setIsNavHidden } = useContext(AuthContext);

  const navigate = useNavigate();

  const removeGroceryList = () => {
    deleteGroceryListById(groceriesList.id, userLists)
      .then((updatedUserLists) => {
        setUserLists(updatedUserLists);

        if (updatedUserLists.length === 0) {
          setIsListEmpty(true);
        }

        navigate("/myLists");
      })
      .catch((error) => {
        setIsNavHidden(true);
        setError(error);
      });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (error) {
    console.log(error);
    throw error; //error to be caught by ErrorBoundary
  }

  return (
    <>
      <main>
        <div className="content card">
          <Card
            showGoBack={true}
            titleIcon={<MdDelete />}
            titleText="Grocery List"
            body={
              <>
                <div className="centered-container">
                  <div className="remove-item-container">
                    <div className="centered-container">
                      <div className="groceries-column-container remove-item">
                        <ul>
                          <li className="remove-item-info">
                            Name: {groceriesList.name}
                          </li>
                          <li className="remove-item-info">
                            Description: {groceriesList.description}
                          </li>
                          <li className="remove-item-info">
                            Items: {groceriesList.itemCount}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="remove-item-question">
                  Do you wish to delete this groceries list and associated items
                  ?
                </p>

                <div className="centered-container remove-item-btns">
                  <button className="btn green" onClick={removeGroceryList}>
                    Confirm
                  </button>
                  <button className="btn red" onClick={handleGoBack}>
                    Cancel
                  </button>
                </div>
              </>
            }
          ></Card>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default RemoveGroceriesList;
