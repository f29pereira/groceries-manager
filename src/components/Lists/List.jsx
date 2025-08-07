import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import { ToastContext } from "../Elements/Toast/ToastProvider";
import { Outlet } from "react-router";
import { fetchAllUserLists } from "./js/groceries_firebase";
import Toast from "../Elements/Toast/Toast";

export const ListContext = createContext();
/**
 * Fetches all groceries lists and provides context with ListContext
 */
function List() {
  //useContext Hooks
  const { currentUser, setIsNavHidden } = useContext(AuthContext);
  const { setToast } = useContext(ToastContext);

  //useState Hooks
  const [userLists, setUserLists] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isListEmpty, setIsListEmpty] = useState(false);
  const [error, setError] = useState(null);

  //useEffect Hook
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
          setToast({
            type: "error",
            message: "Failed to get your grocery lists. Please try again.",
          });
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
