import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { fetchAllUserLists } from "./js/groceries_firebase";
import { AuthContext } from "../../App";

export const ListContext = createContext();
/**
 * Fetches all groceries lists and provides context with ListContext
 */
function List() {
  const { currentUser } = useContext(AuthContext);

  const [userLists, setUserLists] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isListEmpty, setIsListEmpty] = useState(false);

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
        .catch((error) => console.log(error));
    };

    getAllUserLists();
  }, []);

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
