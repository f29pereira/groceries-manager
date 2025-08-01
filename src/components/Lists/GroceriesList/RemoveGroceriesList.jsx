import { useState } from "react";
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

  const [error, setError] = useState(null);

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
            titleText="Groceries List"
            body={
              <>
                <h2 className="remove-question">
                  Do you wish to delete the list named
                  <span> {groceriesList?.name}</span> ?
                </h2>

                <div className="centered-container remove-container">
                  <div className="remove-grid remove-list-col-rows">
                    <h3>Description:</h3>
                    <span className="groceries-description remove-list">
                      {groceriesList.description}
                    </span>

                    <h3>Items Count:</h3>
                    {groceriesList.itemsCount}
                  </div>
                </div>

                <div className="centered-container submit-cancel-btns">
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
