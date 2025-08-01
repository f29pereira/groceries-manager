import { useState, useContext } from "react";
import { ListContext } from "../../List";
import { AuthContext } from "../../../../App";
import { useNavigate } from "react-router";
import { addItem } from "../../js/items_firebase";
import { handleInputChange, showError } from "../../../../utils/utils";
import { IoAdd } from "../../../../utils/icons";
import { GroceriesContext } from "../../GroceriesList/Groceries";
import Card from "../../../Elements/Card";
import ItemForm from "./ItemForm";
import Footer from "../../../Static/Footer";

function AddItem() {
  const {
    groceriesList,
    setGroceriesList,
    isGroceriesListEmpty,
    setIsGroceryListEmpty,
  } = useContext(GroceriesContext);

  const { setUserLists } = useContext(ListContext);

  const { setIsNavHidden } = useContext(AuthContext);

  const navigate = useNavigate();

  const [itemFormData, setItemFormData] = useState({
    name: "",
    quantity: "",
    category_id: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (event) => {
    handleInputChange(event, setItemFormData);
  };

  const addItemToGroceryList = (event) => {
    event.preventDefault();

    addItem(groceriesList.id, itemFormData)
      .then((newItem) => {
        //increment items_count in userLists List state
        setUserLists((prevUserList) =>
          prevUserList.map((list) =>
            list.id === groceriesList.id
              ? { ...list, items_count: list.items_count + 1 }
              : list
          )
        );

        setGroceriesList((prevList) => ({
          ...prevList,
          items_list: [...prevList.items_list, newItem],
          items_count: prevList.items_count + 1,
        }));

        if (isGroceriesListEmpty) {
          setIsGroceryListEmpty(false);
        }

        navigate(-1);
      })
      .catch((error) => {
        setIsNavHidden(true);
        setError(error);
      });
  };

  const clearData = () => {
    setItemFormData({ name: "", quantity: "", categoryId: "" });
  };

  if (error) {
    console.log(error);
    throw error; //error to be caught by ErrorBoundary
  }

  return (
    <>
      <main>
        <div className="content card">
          <Card
            showGoBack={true}
            titleIcon={<IoAdd />}
            titleText="Item"
            body={
              <ItemForm
                handleOnSubmit={addItemToGroceryList}
                handleChange={handleChange}
                formData={itemFormData}
                handleCancel={clearData}
              />
            }
          />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default AddItem;
