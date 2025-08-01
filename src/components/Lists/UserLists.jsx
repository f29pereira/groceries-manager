import { useContext } from "react";
import { IoIosAddCircle, FaInfoCircle } from "../../utils/icons";
import { ListContext } from "./List";
import Footer from "../Static/Footer";
import LinkButton from "../Elements/LinkButton";
import Loading from "../Elements/Loading";

/**
 * Renders all groceries lists created by the user
 */
function UserLists() {
  const { userLists, isLoadingData, isListEmpty } = useContext(ListContext);

  return (
    <>
      <main>
        {isLoadingData ? (
          <Loading message="Loading your lists" />
        ) : (
          <div className="content list">
            <div className="centered-container">
              <header className="header groceries">
                <h1>My Lists</h1>
              </header>
            </div>

            <section>
              <div className="centered-container add-container">
                <LinkButton
                  path="/myLists/addList/"
                  classNames="green"
                  icon={<IoIosAddCircle />}
                  name="Add List"
                />
              </div>

              <div className="counter-list">
                <h2 className="counter">
                  Groceries Lists Count: <span>{userLists.length}</span>
                </h2>
              </div>

              <div className="table">
                <div className="row-container table-header">
                  <div className="column-container name">Name</div>
                  <div className="column-container creationDate">
                    Creation Date
                  </div>
                  <div className="column-container itemCount">Items</div>
                  <div className="column-container listInfo">List Info</div>
                </div>

                {isListEmpty ? (
                  <div className="row-container no-data">
                    No groceries list created yet. Click the "Add List" button.
                  </div>
                ) : (
                  userLists.map((list, index) => (
                    <div key={index} className="row-container data">
                      <div className="column-container name">{list.name}</div>
                      <div className="column-container creationDate">
                        {list.created_at}
                      </div>
                      <div className="column-container itemCount">
                        {list.itemCount}
                      </div>
                      <div className="column-container listInfo">
                        <div className="centered-container">
                          <LinkButton
                            path={`/myLists/groceryList/${index}`}
                            classNames="info-list-btn"
                            icon={<FaInfoCircle className="info-icon" />}
                            state={{ index: index, id: list.id }}
                            title="Groceries List Info"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default UserLists;
