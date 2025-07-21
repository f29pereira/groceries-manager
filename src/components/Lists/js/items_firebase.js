import { db } from "../../../firebase/firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

/**
 * Creates a new document on the items collection
 * @param {string} groceryListId - grocery_list document id
 * @param {object} formData - item form data
 */
export const addItem = async (groceryListId, formData) => {
  const groceryCategoryRef = doc(db, "grocery_categories", formData.categoryId);

  const itemObj = {
    name: formData.name,
    quantity: formData.quantity,
    grocery_categories_id: groceryCategoryRef,
  };

  const id = `item_${new Date().toISOString()}`;

  const itemRef = doc(db, "items", id);
  await setDoc(itemRef, itemObj);

  const groceryListRef = doc(db, "groceries_list", groceryListId);

  await updateDoc(groceryListRef, {
    items_list: arrayUnion(itemRef),
  });
};

/**
 * Removes document from items collection
 * @param {string} itemId - item to be removed
 */
export const removeItemById = async (itemId) => {
  //TO DO:
  //delete document reference from groceries_list "items_list" field
  //delete document from items collection
};

/**
 * Updates document from items collection
 * @param {string} itemId - item to be updated
 */
export const updateItemById = async (itemId) => {
  //TO DO:
  //fetch document and update data
};

/**
 * Fetches all grocery_categories documents
 * @returns {array} - array of grocery_categories documents
 */
export const fetchGroceryCategories = async () => {
  const querySnapshot = await getDocs(collection(db, "grocery_categories"));

  const dataList = !querySnapshot.empty
    ? querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    : "Categories not found";

  return dataList;
};
