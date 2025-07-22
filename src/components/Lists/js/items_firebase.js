import { db } from "../../../firebase/firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getDocumentRefSnapShot } from "../../../utils/utils";

/**
 * Creates a new document on the items collection
 * @param {string} groceryListId - grocery_list document id
 * @param {object} formData - item form data
 * @returns {object} - object with new document data
 */
export const addItem = async (groceryListId, formData) => {
  const categoryDoc = await getDocumentRefSnapShot(
    "grocery_categories",
    formData.categoryId
  );
  const categoryRef = categoryDoc.reference;
  const categorySnapshot = categoryDoc.snapShot;

  //new item document
  const firebaseItemObj = {
    name: formData.name,
    quantity: formData.quantity,
    grocery_categories_id: categoryRef,
  };

  const id = `item_${new Date().toISOString()}`;

  const itemRef = doc(db, "items", id);
  await setDoc(itemRef, firebaseItemObj);

  const groceryListDoc = await getDocumentRefSnapShot(
    "groceries_list",
    groceryListId
  );
  const groceryListRef = groceryListDoc.reference;

  await updateDoc(groceryListRef, {
    items_list: arrayUnion(itemRef),
  });

  //item to be added in state
  const itemObj = {
    id: id,
    name: formData.name,
    quantity: formData.quantity,
    category_name: "",
    category_color: "",
  };

  if (categorySnapshot.exists()) {
    itemObj.category_name = categorySnapshot.data().name;
    itemObj.category_color = categorySnapshot.data().color;
  }

  return itemObj;
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
