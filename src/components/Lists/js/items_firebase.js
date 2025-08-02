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
import {
  getDocumentRefSnapShot,
  validateArray,
  validateString,
} from "../../../utils/utils";
import {
  validateGroceriesListSnapShot,
  validateItemSnapShot,
  validateCategoriesSnapShot,
} from "./groceries_firebase";

/**
 * Creates a new document on the items collection
 * @param {string} groceryListId - grocery_list document id
 * @param {object} formData - item form data
 * @returns {object} - object with new document data
 * @throws {Error} - if no item_categories document is found
 * @throws {Error} - if no grocery_list document is found
 */
export const addItem = async (groceriesListId, formData) => {
  validateString(groceriesListId);
  validateItemFormData(formData);

  //item_categories document
  const categoryDoc = await getDocumentRefSnapShot(
    "item_categories",
    formData.category_id
  );
  const categoryRef = categoryDoc.reference;
  const categorySnapshot = categoryDoc.snapShot;
  validateCategoriesSnapShot(categorySnapshot, formData.category_id);

  //groceries_list document
  const groceryListDoc = await getDocumentRefSnapShot(
    "groceries_list",
    groceriesListId
  );
  const groceryListRef = groceryListDoc.reference;
  validateGroceriesListSnapShot(groceryListDoc.snapShot, groceriesListId);

  //item to be added in state
  const itemObj = {
    id: "",
    name: formData.name,
    quantity: formData.quantity,
    category_id: "",
    category_name: "",
    category_color: "",
    isChecked: false,
  };

  //new item document
  const firebaseItemObj = {
    name: formData.name,
    quantity: formData.quantity,
    grocery_categories_id: categoryRef,
    isChecked: false,
  };

  //add new document to items collection
  const id = `item_${new Date().toISOString()}`;
  const itemRef = doc(db, "items", id);
  await setDoc(itemRef, firebaseItemObj);

  //update groceries list document with ref of new item
  await updateDoc(groceryListRef, {
    items_list: arrayUnion(itemRef),
  });

  itemObj.id = id;
  itemObj.category_id = categorySnapshot.id;
  itemObj.category_name = categorySnapshot.data().name;
  itemObj.category_color = categorySnapshot.data().color;

  return itemObj;
};

/**
 * Removes document from items collection
 * @param {string} itemId - item to be removed
 */
export const removeItemById = async (itemId, groceriesListId, itemsList) => {
  validateString(itemId);
  validateString(groceriesListId);
  validateArray(itemsList);

  //item document
  const itemDoc = await getDocumentRefSnapShot("items", itemId);
  const itemReference = itemDoc.reference;
  validateItemSnapShot(itemDoc.snapShot, itemId);

  //groceries_list document
  const groceriesListDoc = await getDocumentRefSnapShot(
    "groceries_list",
    groceriesListId
  );
  const groceryListReference = groceriesListDoc.reference;
  validateGroceriesListSnapShot(groceriesListDoc.snapShot, itemId);

  let updatedItemsList = [];

  //remove document reference from groceries_list
  await updateDoc(groceryListReference, {
    items_list: arrayRemove(itemReference),
  });

  //update list of items
  updatedItemsList = itemsList.filter((item) => item.id != itemId);

  //delete document from items collection
  await deleteDoc(itemReference);

  return updatedItemsList;
};

/**
 * Returns item if exists on itemsList state
 * @param {string} itemId - item id
 * @param {array} itemsList - list of items
 * @returns {object} item
 * @throws {Error} - if item ins't found
 */
export const getItemById = (itemId, itemsList) => {
  validateString(itemId);
  validateArray(itemsList);

  const item = itemsList.find((item) => item.id === itemId);

  if (!item) {
    throw new Error("Item not found");
  }

  return item;
};

/**
 * Updates item document by given id
 * @param {string} itemId   - item to be updated
 * @param {object} formData - item form data
 * @param {array} itemsList - list of items
 * @returns {object}        - list of items to update state
 */
export const updateItemById = async (itemId, formData, itemsList) => {
  validateString(itemId);
  validateItemFormData(formData);
  validateArray(itemsList);

  //item document
  const itemDoc = await getDocumentRefSnapShot("items", itemId);
  const itemReference = itemDoc.reference;
  validateItemSnapShot(itemDoc.snapShot, itemId);

  //item_categories document
  const categoryDoc = await getDocumentRefSnapShot(
    "item_categories",
    formData.category_id
  );
  const categoryRef = categoryDoc.reference;
  const categorySnapshot = categoryDoc.snapShot;
  validateCategoriesSnapShot(categorySnapshot, formData.category_id);

  //update item document data in firebase
  await updateDoc(itemReference, {
    name: formData.name,
    quantity: formData.quantity,
    grocery_categories_id: categoryRef,
  });

  //list of items to update state
  const updatedItemsList = itemsList.map((item) => {
    if (item.id === itemId) {
      const categoryData = categorySnapshot.data();

      return {
        ...item,
        name: formData.name,
        quantity: formData.quantity,
        category_id: formData.category_id,
        category_name: categoryData.name,
        category_color: categoryData.color,
      };
    }

    return item;
  });

  return updatedItemsList;
};

/**
 * Checks item document by given id
 * @param {string} itemId   - item to be updated
 * @param {array} itemsList - list of items
 * @returns {object}        - list of items to update state
 */
export const checkItemById = async (itemId, itemsList) => {
  validateString(itemId);

  //item document
  const itemDoc = await getDocumentRefSnapShot("items", itemId);
  const itemReference = itemDoc.reference;
  const itemSnapShot = itemDoc.snapShot;
  validateItemSnapShot(itemSnapShot, itemId);

  const isCheckedValue = itemSnapShot.data().isChecked;

  //update item document isChecked field in firebase
  await updateDoc(itemReference, {
    isChecked: !isCheckedValue,
  });

  //list of items to update state
  const updatedItemsList = itemsList.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        isChecked: !isCheckedValue,
      };
    }

    return item;
  });

  return updatedItemsList;
};

/**
 * Fetches all item_categories documents
 * @returns {array} - array of item_categories documents
 * @throws {Error} - if no item_categories documents are found
 */
export const fetchGroceryCategories = async () => {
  const querySnapshot = await getDocs(collection(db, "item_categories"));

  if (querySnapshot.empty) {
    throw new Error("No items categories data found");
  }

  const categoriesList = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return categoriesList;
};

/**
 * Validates item form data
 * @param {object} formData - item form data
 * @throws {Error} - if form data ins't valid
 */
const validateItemFormData = (formData) => {
  if (!formData) {
    throw new Error("Invalid item form data object");
  }

  validateString(formData.name, "item name");
  validateString(formData.quantity, "item quantity");
  validateString(formData.category_id, "category Id");

  return;
};
