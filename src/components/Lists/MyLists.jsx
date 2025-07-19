import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchAllUserLists } from "./js/groceries_firebase";
import { AuthContext } from "../../App";
import { IoIosAddCircle, FaInfoCircle } from "../../utils/icons";
import Footer from "../Static/Footer";
import LinkButton from "../Elements/LinkButton";
import Loading from "../Elements/Loading";

function MyLists() {
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
    <>
      <main>
        <div className="content list">
          <header className="header groceries">
            <h1>My Lists</h1>
          </header>

          <section>
            <div className="centered-container">
              <LinkButton
                path="/myLists/addList/"
                classNames="green"
                icon={<IoIosAddCircle />}
                name="Add List"
              />
            </div>

            <div className="table">
              <div className="row-container table-header">
                <div className="column-container name">Name</div>
                <div className="column-container description">Description</div>
                <div className="column-container itemCount">Items</div>
                <div className="column-container listInfo">List Info</div>
              </div>

              {isLoadingData ? (
                <div className="row-container no-data">
                  <Loading>Loading your lists</Loading>
                </div>
              ) : isListEmpty ? (
                <div className="row-container no-data">
                  No groceries list created yet. Click the "Add List" button.
                </div>
              ) : (
                userLists.map((list, index) => (
                  <div key={index} className="row-container">
                    <div className="column-container name">{list.name}</div>
                    <div className="column-container description">
                      {list.description}
                    </div>
                    <div className="column-container itemCount">
                      {list.itemCount}
                    </div>
                    <div className="column-container listInfo">
                      <div className="centered-container">
                        <LinkButton
                          path={`/myLists/groceryList/${index}`}
                          classNames="blue info-list-btn"
                          icon={<FaInfoCircle />}
                          name="Info"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default MyLists;
