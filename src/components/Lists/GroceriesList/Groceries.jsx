import { createContext, useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { fetchGroceryListById } from "../js/groceries_firebase";

export const GroceriesContext = createContext();
/**
 * Fetches groceries list and provides context with GroceriesContext
 */
function Groceries() {
  const location = useLocation();

  const [groceriesList, setGroceriesList] = useState({
    id: "",
    name: "",
    description: "",
    items_list: [],
    itemsCount: "",
    created_at: "",
    index: "",
  });
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
