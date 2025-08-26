import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../App";
import { ToastContext } from "../Elements/Toast/ToastProvider";
import { ListContext } from "./List";
import { Link } from "react-router";
import { IoIosAddCircle, FaInfoCircle, MdDelete } from "../../utils/icons";
import { sortColumns } from "../../utils/utils";
import Footer from "../Static/Footer";
import LinkButton from "../Elements/LinkButton";
import Toast from "../Elements/Toast/Toast";
import Loading from "../Elements/Loading";
import useSort from "../customHooks/useSort";
import SortIcon from "../Elements/SortIcon";
import DateTime from "../Elements/DateTime";

/**
 * Renders all grocery lists created by the user
 */
function UserLists() {
  //useContext Hooks
  const { setIsNavHidden } = useContext(AuthContext);
  const { toast, setToast, clearSuccessToast } = useContext(ToastContext);
  const { userLists, setUserLists, isLoadingData, isListEmpty } =
    useContext(ListContext);

  //useState Hook
  const [error, setError] = useState(null);

  //custom Hook
  const { sorting, toggleSortOrder } = useSort("created_at", "desc");

  //useEffect Hook
  //clears toast notification after 5 seconds
  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        clearSuccessToast();
      }, 5000);
    }
  }, [toast]);

  //updates grocery lists sort order when sorting order changes value
  useEffect(() => {
    if (userLists.length) {
      try {
        const sortedGroceryList = sortColumns(userLists, {
          column_name: sorting.column_name,
          order: sorting.order,
        });

        setUserLists(sortedGroceryList);
      } catch (error) {
        setToast({
          type: "error",
          message: "Failed to sort your lists. Please try again.",
        });
        setIsNavHidden(true);
        setError(error);
      }
    }
  }, [sorting.order]);

  /**
   * Toggles the sorting order for given column
   */
  const toggleColumnSort = () => {
    toggleSortOrder();
  };

  if (error) {
    console.log(error);
    throw error; //error to be caught by ErrorBoundary
  }

  return (
    <main>
      {isLoadingData ? (
        <Loading message="Loading your lists" />
      ) : (
        <div className="content list">
          <div className="toast-header">
            {/*Toast Notification*/}
            <div className="centered-column-container toast">
              {toast && toast?.type === "success" && toast?.message ? (
                <Toast type={toast.type} message={toast.message} />
              ) : null}
            </div>

            {/*Header*/}
            <header className="title">
              <h1>My Grocery Lists</h1>
            </header>
          </div>

          <section>
            <div className="space-between-container counter-add-list">
              {/*List Counter*/}
              <div className="counter-list">
                <h2 className="counter">
                  Lists Count: <span>{userLists.length}</span>
                </h2>
              </div>

              {/*Add Groceries List*/}
              <div className="centered-container">
                <LinkButton
                  path="/myLists/addList/"
                  classNames="green"
                  icon={<IoIosAddCircle />}
                  name="Add List"
                />
              </div>
            </div>

            {/*Grocery Lists Table*/}
            <div className="table">
              <div className="row-container table-header">
                {/*List Name Header Column*/}
                <div className="column-container name">Name</div>

                {/*List Creation Date Header Column*/}
                <div className="column-container creationDate">
                  <div className="left-container gap">
                    <span className="creation-date-text">Date Added</span>
                    {userLists.length > 1 ? (
                      <div
                        onClick={() => {
                          toggleColumnSort();
                        }}
                      >
                        <SortIcon order={sorting.order} />
                      </div>
                    ) : null}
                  </div>
                </div>

                {/*List Items Counter Header Column*/}
                <div className="column-container itemCount">Items</div>

                {/*List User Actions Header Column*/}
                <div className="column-container listInfo">Actions</div>
              </div>

              {isListEmpty ? (
                <div className="row-container no-data">
                  No grocery lists created yet. Click the "Add List" button.
                </div>
              ) : (
                userLists.map((list, index) => (
                  <div key={index} className="row-container data">
                    {/*List Name Data Column*/}
                    <div className="column-container name">{list.name}</div>

                    {/*List Creation Date Data Column*/}
                    <div className="column-container creationDate gap">
                      <DateTime
                        isDisplayInline={false}
                        date={list.created_at_date}
                        time={list.created_at_time}
                      />
                    </div>

                    {/*List Items Counter Data Column*/}
                    <div className="column-container itemCount">
                      {list.items_count}
                    </div>

                    {/*List User Actions Data Column*/}
                    <div className="column-container listInfo">
                      <div className="actions-container">
                        <Link
                          to={`/myLists/groceryList/${index}`}
                          title="List Info"
                          state={{ index: index, id: list.id }}
                        >
                          <FaInfoCircle className="info-icon" />
                        </Link>

                        <Link
                          to={`/myLists/groceryList/${index}/remove`}
                          title="Remove List"
                          state={{ id: list.id }}
                        >
                          <MdDelete className="delete-icon" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      )}
      <Footer />
    </main>
  );
}

export default UserLists;
