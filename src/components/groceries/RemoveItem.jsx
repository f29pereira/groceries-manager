import { useContext } from "react";
import { AuthContext } from "../../App";
import { useLocation, useNavigate } from "react-router";
import { removeItem } from "./js/groceries_firebase";
import Card from "../Elements/Card";
import Footer from "../Static/Footer";
import { MdDelete } from "../../utils/icons";

function RemoveItem() {
  const { currentUser } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const removeItemFromGroceryList = () => {
    removeItem(currentUser.uid, location.state)
      .then(() => {
        navigate("/groceries/list");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <main>
        <div className="content">
          <Card
            showGoBack={true}
            titleIcon={<MdDelete />}
            titleText="Delete Item"
            body={
              <>
                <div className="centered-container">
                  <div className="remove-item-container">
                    <div className="centered-container">
                      <div className="groceries-column-container remove-item">
                        <ul>
                          <li className="remove-item-info">Category:</li>
                          <li className="remove-item-info">Item:</li>
                          <li className="remove-item-info">Quantity:</li>
                        </ul>
                      </div>
                      <div className="groceries-column-container remove-item">
                        <ul>
                          <li className="remove-item-info">
                            <span
                              className="item-category"
                              style={{
                                backgroundColor: location.state?.categoryColor,
                              }}
                            >
                              {location.state?.categoryName}
                            </span>
                          </li>
                          <li className="remove-item-info">
                            {location.state?.name}
                          </li>
                          <li className="remove-item-info">
                            {location.state?.quantity}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="remove-item-question">
                  Do you wish to remove this item from your groceries list ?
                </p>

                <div className="centered-container remove-item-btns">
                  <button
                    className="btn submit"
                    onClick={removeItemFromGroceryList}
                  >
                    Confirm
                  </button>
                  <button className="btn cancel" onClick={handleGoBack}>
                    Cancel
                  </button>
                </div>
              </>
            }
          />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default RemoveItem;
