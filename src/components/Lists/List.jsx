import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { fetchAllUserLists } from "./js/groceries_firebase";
import { AuthContext } from "../../App";

export const ListContext = createContext();
/**
 * Fetches all groceries lists and provides context with ListContext
 */
function List() {
  const { currentUser, setIsNavHidden } = useContext(AuthContext);

  const [userLists, setUserLists] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isListEmpty, setIsListEmpty] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllUserLists = () => {
      fetchAllUserLists(currentUser.uid)
        .then((data) => {
          setIsLoadingData(false);
          if (data.length !== 0) {
            setUserLists(data);
          } else {
            setIsListEmpty(true);
          }
        })
        .catch((error) => {
          setIsNavHidden(true);
          setError(error);
        });
    };

    getAllUserLists();
  }, []);

  if (error) {
    console.log(error);
    throw error; //error to be caught by ErrorBoundary
  }

  return (
    <ListContext
      value={{
        userLists,
        setUserLists,
        isLoadingData,
        isListEmpty,
        setIsListEmpty,
      }}
    >
      <Outlet />
    </ListContext>
  );
}

export default List;
