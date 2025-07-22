import { createContext, useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { fetchGroceryListById } from "../js/groceries_firebase";

export const GroceriesContext = createContext();

/**
 * Fetches Groceries List and provides context
 */
function Groceries() {
  const location = useLocation();

  const [groceriesList, setGroceriesList] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isGroceriesListEmpty, setIsGroceryListEmpty] = useState(false);

  useEffect(() => {
    const getGroceryList = () => {
      fetchGroceryListById(location.state?.id)
        .then((data) => {
          setIsLoadingData(false);

          if (data.items_list.length === 0) {
            setIsGroceryListEmpty(true);
          }

          const groceriesListData = {
            ...data,
            index: location.state?.index,
          };

          setGroceriesList(groceriesListData);
        })
        .catch((error) => console.log(error));
    };

    getGroceryList();
  }, []);

  return (
    <GroceriesContext
      value={{
        groceriesList,
        setGroceriesList,
        isLoadingData,
        isGroceriesListEmpty,
      }}
    >
      <Outlet />
    </GroceriesContext>
  );
}

export default Groceries;
