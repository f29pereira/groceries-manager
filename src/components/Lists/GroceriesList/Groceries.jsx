import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../App";
import { ToastContext } from "../../Elements/Toast/ToastProvider";
import { Outlet, useLocation } from "react-router";
import { fetchGroceriesListById } from "../js/groceries_firebase";

export const GroceriesContext = createContext();
/**
 * Fetches groceries list and provides context with GroceriesContext
 */
function Groceries() {
  //useContext Hooks
  const { setIsNavHidden } = useContext(AuthContext);
  const { setToast } = useContext(ToastContext);

  //useLocation Hook
  const location = useLocation();

  //useState Hooks
  const [groceriesList, setGroceriesList] = useState({
    id: "",
    name: "",
    description: "",
    items_list: [],
    items_count: "",
    created_at: "",
    isChecked: false,
  });
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isGroceriesListEmpty, setIsGroceryListEmpty] = useState(false);
  const [error, setError] = useState(null);

  //useEffect Hook
  useEffect(() => {
    const getGroceryList = () => {
      fetchGroceriesListById(location.state?.id)
        .then((data) => {
          setIsLoadingData(false);
          if (data.items_list.length === 0) {
            setIsGroceryListEmpty(true);
          }

          const groceriesListData = {
            ...data,
            index: location.state?.index, //url index
          };

          setGroceriesList(groceriesListData);
        })
        .catch((error) => {
          setToast({
            type: "error",
            message: "Failed to get your groceries list. Please try again.",
          });
          setIsNavHidden(true);
          setError(error);
        });
    };

    getGroceryList();
  }, []);

  if (error) {
    console.log(error);
    throw error; //error to be caught by ErrorBoundary
  }

  return (
    <GroceriesContext
      value={{
        groceriesList,
        setGroceriesList,
        isLoadingData,
        setIsLoadingData,
        isGroceriesListEmpty,
        setIsGroceryListEmpty,
      }}
    >
      <Outlet />
    </GroceriesContext>
  );
}

export default Groceries;
