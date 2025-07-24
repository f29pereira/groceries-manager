import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { addItem } from "../../js/items_firebase";
import { handleInputChange, showError } from "../../../../utils/utils";
import { IoAdd } from "../../../../utils/icons";
import { GroceriesContext } from "../../GroceriesList/Groceries";
import Card from "../../../Elements/Card";
import ItemForm from "./ItemForm";
import Footer from "../../../Static/Footer";
import { ListContext } from "../../List";

function AddItem() {
  const {
    groceriesList,
    setGroceriesList,
    isGroceriesListEmpty,
    setIsGroceryListEmpty,
  } = useContext(GroceriesContext);

  const { setUserLists } = useContext(ListContext);

  const navigate = useNavigate();

  const [itemFormData, setItemFormData] = useState({
    name: "",
    quantity: "",
    category_id: "",
  });

  const [errorMsg, setErrorMsg] = useState({
    generic: "",
  });

  const handleChange = (event) => {
    handleInputChange(event, setItemFormData);
  };

  const addItemToGroceryList = (event) => {
    event.preventDefault();

    addItem(groceriesList.id, itemFormData)
      .then((newItem) => {
        //increment itemCount in userLists List state
        setUserLists((prevUserList) =>
          prevUserList.map((list) =>
            list.id === groceriesList.id
              ? { ...list, itemCount: list.itemCount + 1 }
              : list
          )
        );

        setGroceriesList((prevList) => ({
          ...prevList,
          items_list: [...prevList.items_list, newItem],
          itemsCount: prevList.itemsCount + 1,
        }));

        if (isGroceriesListEmpty) {
          setIsGroceryListEmpty(false);
        }

        navigate(-1);
      })
      .catch((error) => {
        console.log(error);
        showError(error, setErrorMsg);
      });
  };

  const clearData = () => {
    setItemFormData({ name: "", quantity: "", categoryId: "" });
  };

  return (
    <>
      <main>
        <div className="content card">
          <Card
            showGoBack={true}
            titleIcon={<IoAdd />}
            titleText="Add Item"
            body={
              <ItemForm
                handleOnSubmit={addItemToGroceryList}
                errorMsg={errorMsg}
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
