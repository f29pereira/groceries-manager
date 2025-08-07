import { useEffect, useState } from "react";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../../App";
import { ToastContext } from "../../Elements/Toast/ToastProvider";
import { ListContext } from "../List";
import {
  getGroceriesListById,
  deleteGroceryListById,
} from "../js/groceries_firebase";
import { MdDelete } from "../../../utils/icons";
import Card from "../../Elements/Card";
import Toast from "../../Elements/Toast/Toast";
import Footer from "../../Static/Footer";

function RemoveGroceriesList() {
  //useContext Hooks
  const { setIsNavHidden } = useContext(AuthContext);
  const { setToast } = useContext(ToastContext);
  const { userLists, setUserLists, setIsListEmpty } = useContext(ListContext);

  //useState Hooks
  const [listData, setListData] = useState({
    name: "",
    description: "",
    items_count: "",
  });
  const [error, setError] = useState(null);

  //React router Hooks
  const navigate = useNavigate();
  const location = useLocation();

  //useEffect Hook
  useEffect(() => {
    const getGroceryListData = () => {
      try {
        const groceriesList = getGroceriesListById(
          location.state?.id,
          userLists
        );
        setListData(groceriesList);
      } catch (error) {
        setIsNavHidden(true);
        setError(error);
      }
    };

    getGroceryListData();
  }, []);

  const removeGroceryList = () => {
    deleteGroceryListById(location.state?.id, userLists)
      .then((updatedUserLists) => {
        setUserLists(updatedUserLists);

        if (updatedUserLists.length === 0) {
          setIsListEmpty(true);
        }

        setToast({
          type: "success",
          message: "Groceries list removed successfully",
        });
        navigate(-1);
      })
      .catch((error) => {
        setToast({
          type: "error",
          message: "Failed to remove groceries list. Please try again.",
        });
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
                  <span> {listData.name}</span> ?
                </h2>

                <div className="centered-container remove-container">
                  <div className="remove-grid remove-list-col-rows">
                    <h3>Description:</h3>
                    <span className="groceries-description remove-list">
                      {listData.description}
                    </span>

                    <h3>Items Count:</h3>
                    {listData.items_count}
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
