import { db } from "../../../firebase/firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  arrayUnion,
  arrayRemove,
  updateDoc,
  deleteDoc,
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
    formData.category_id
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
    category_id: "",
    category_name: "",
    category_color: "",
  };

  if (categorySnapshot.exists()) {
    itemObj.category_id = categorySnapshot.id;
    itemObj.category_name = categorySnapshot.data().name;
    itemObj.category_color = categorySnapshot.data().color;
  }

  return itemObj;
};

/**
 * Removes document from items collection
 * @param {string} itemId - item to be removed
 */
export const removeItemById = async (itemId, listId, itemsList) => {
  const itemDoc = await getDocumentRefSnapShot("items", itemId);
  const itemReference = itemDoc.reference;

  const groceriesListDoc = await getDocumentRefSnapShot(
    "groceries_list",
    listId
  );
  const groceryListReference = groceriesListDoc.reference;
  const groceryListSnapShot = groceriesListDoc.snapShot;

  let updatedItemsList = [];

  if (groceryListSnapShot.exists()) {
    //remove document reference from groceries_list
    await updateDoc(groceryListReference, {
      items_list: arrayRemove(itemReference),
    });

    //update list of items
    updatedItemsList = itemsList.filter((item) => item.id != itemId);

    //delete document from items collection
    await deleteDoc(itemReference);
  }

  return updatedItemsList;
};

/**
 * Returns item if exists on itemsList
 * @param {string} itemId - item id
 * @param {array} itemsList - list of items
 * @returns {object} item
 */
export const getItemById = (itemId, itemsList) => {
  for (const item of itemsList) {
    if (item.id === itemId) {
      return item;
    }
  }
};

/**
 * Updates item document by given id
 * @param {string} itemId   - item to be updated
 * @param {object} formData - item form data
 * @param {array} itemsList - list of items
 * @returns {object}        - list of items to update state
 */
export const updateItemById = async (itemId, formData, itemsList) => {
  const itemDoc = await getDocumentRefSnapShot("items", itemId);
  const itemReference = itemDoc.reference;
  const itemSnapShot = itemDoc.snapShot;

  const categoryDoc = await getDocumentRefSnapShot(
    "grocery_categories",
    formData.category_id
  );
  const categoryRef = categoryDoc.reference;
  const categorySnapshot = categoryDoc.snapShot;

  if (itemSnapShot.exists() && categorySnapshot.exists()) {
    //update document item data in firebase
    await updateDoc(itemReference, {
      name: formData.name,
      quantity: formData.quantity,
      grocery_categories_id: categoryRef,
    });

    //list of items to update state
    for (const item of itemsList) {
      if (item.id === itemId) {
        item.name = formData.name;
        item.quantity = formData.quantity;
        item.category_id = formData.category_id;
        item.category_name = categorySnapshot.data().name;
        item.category_color = categorySnapshot.data().color;
      }
    }
  }

  return itemsList;
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
