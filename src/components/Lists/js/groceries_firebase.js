import { db } from "../../../firebase/firebase";
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  formatDate,
  formatTime,
  getDocumentRefSnapShot,
  validateString,
  validateArray,
  validateObject,
  sortColumns,
} from "../../../utils/utils";
import { getSortedAndCheckedItems } from "./items_firebase";

/**
 * Creates a new document on the groceries_list collection
 * @param {string} userId - authenticated user id
 * @param {array} userLists - array of groceries lists
 * @returns {array} array of groceries list to update state
 */
export const addEmptyGroceryList = async (userId, formData, userLists) => {
  validateString(userId, "userId");
  validateGroceriesLisFormData(formData);
  validateArray(userLists, "userLists");

  const date = new Date().toISOString();

  //new grocery_list document
  const firebaseGroceryListObj = {
    name: formData.name,
    description: formData.description,
    items_list: [],
    created_at: date,
    user_id: userId,
  };

  const groceryId = `${userId}_${date}`;

  await setDoc(doc(db, "groceries_list", groceryId), firebaseGroceryListObj);

  //new element to be added to state
  const groceryListObj = {
    id: groceryId,
    name: formData.name,
    description: formData.description,
    items_count: 0,
    created_at: date,
    created_at_date: formatDate(date),
    created_at_time: formatTime(date),
  };

  let updatedUserLists = userLists;
  updatedUserLists.push(groceryListObj);

  return updatedUserLists;
};

/**
 * Fetches all groceries_list documents of the autenticated user
 * @param {string} userId - authenticated user id
 * @returns {array} user lists
 */
export const fetchAllUserLists = async (userId) => {
  validateString(userId, "userId");

  const userListsCopy = [];

  const query = await userListsQuery(userId);

  if (!query.empty) {
    const userLists = query.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    for (const list of userLists) {
      const items = list.data.items_list;
      const itemsLength = items ? items.length : 0;

      userListsCopy.push({
        id: list.id,
        name: list.data.name,
        created_at: list.data.created_at,
        description: list.data.description,
        items_count: itemsLength,
        created_at_date: formatDate(list.data.created_at),
        created_at_time: formatTime(list.data.created_at),
      });
    }
  }

  //Object to sort columns
  const sortDateObj = {
    order: "desc",
    column_name: "created_at",
  };

  return sortColumns(userListsCopy, sortDateObj);
};

/**
 * Queries all the groceries_list documents for given user id
 * @param {userId} userId  - authenticated user id
 * @returns {object} result of the query
 */
const userListsQuery = async (userId) => {
  const userQuery = query(
    collection(db, "groceries_list"),
    where("user_id", "==", userId)
  );
  const querySnapshot = await getDocs(userQuery);

  return querySnapshot;
};

/**
 * Returns groceries list from state
 * @param {string} listId - groceries list id
 * @param {array} userLists - array of groceries list
 * @returns {object} object with name/description/items_count
 */
export const getGroceriesListById = (listId, userLists) => {
  validateString(listId, "listId");
  validateArray(userLists, "userLists");

  const groceriesListObj = {
    name: "",
    description: "",
    items_count: 0,
  };

  const list = userLists.find((list) => list.id === listId);

  if (!list) {
    throw new Error("Groceries list not found");
  }

  groceriesListObj.name = list.name;
  groceriesListObj.description = list.description;
  groceriesListObj.items_count = list.items_count;

  return groceriesListObj;
};

/**
 * Fetches groceries_list document by given id
 * @param {string} listId - groceries_list document id
 * @returns {object} object with groceries list data
 */
export const fetchGroceriesListById = async (listId) => {
  validateString(listId, "list ID");

  const groceryListToCopy = {
    id: "",
    name: "",
    description: "",
    items_list: [],
    items_count: 0,
    created_at: "",
  };

  //groceries_list document
  const groceriesListDocument = await getDocumentRefSnapShot(
    "groceries_list",
    listId
  );
  const groceriesListSnapShot = groceriesListDocument.snapShot;
  validateGroceriesListSnapShot(groceriesListSnapShot, listId);

  const groceriesData = groceriesListSnapShot.data();

  groceryListToCopy.id = listId;
  groceryListToCopy.name = groceriesData.name;
  groceryListToCopy.description = groceriesData.description;
  groceryListToCopy.created_at = formatDate(groceriesData.created_at);

  //items document references
  const itemsList = groceriesData.items_list;

  groceryListToCopy.items_count = itemsList.length;

  if (itemsList.length > 0) {
    for (const item of itemsList) {
      let itemId = "";
      let itemName = "";
      let itemQuantity = "";
      let categoryId = "";
      let categoryName = "";
      let categoryColor = "";
      let itemIsChecked = false;

      //items document
      const itemDocument = await getDocumentRefSnapShot("items", item.id);
      const itemSnapShot = itemDocument.snapShot;
      validateItemSnapShot(itemSnapShot, item.id);

      const itemSnapShotData = itemSnapShot.data();

      itemId = itemSnapShot.id;
      itemName = itemSnapShotData.name;
      itemQuantity = itemSnapShotData.quantity;
      itemIsChecked = itemSnapShotData.isChecked;

      //item_categories document
      const categoryRef = itemSnapShotData.grocery_categories_id;
      const categorySnapshot = await getDoc(categoryRef);
      validateCategoriesSnapShot(categorySnapshot, categorySnapshot.id);

      const categorySnapshotData = categorySnapshot.data();

      categoryId = categorySnapshot.id;
      categoryName = categorySnapshotData.name;
      categoryColor = categorySnapshotData.color;

      //groceries list item
      groceryListToCopy.items_list.push({
        id: itemId,
        name: itemName,
        quantity: itemQuantity,
        isChecked: itemIsChecked,
        category_id: categoryId,
        category_name: categoryName,
        category_color: categoryColor,
      });
    }
  }

  //Objects to sort columns "Category" and "Item"
  const sortCategoriesObj = {
    order: "asc",
    column_name: "category_name",
  };
  const sortItemsNameObj = {
    order: "asc",
    column_name: "name",
  };

  return {
    ...groceryListToCopy,
    items_list: getSortedAndCheckedItems(
      groceryListToCopy.items_list,
      sortCategoriesObj,
      sortItemsNameObj
    ),
  };
};

/**
 * Updates groceries_list document name/description fields by given id
 * @param {object} groceriesList  - groceries list to be updated
 * @param {object} formData  - groceries list form data
 * @returns {object} - groceries list object to update state
 */
export const updateGroceryList = async (groceriesList, formData) => {
  validateString(groceriesList.id, "groceriesList id");
  validateGroceriesLisFormData(formData);

  const document = await getDocumentRefSnapShot(
    "groceries_list",
    groceriesList.id
  );
  const reference = document.reference;
  const snapShot = document.snapShot;
  validateGroceriesListSnapShot(snapShot, groceriesList.id);

  const groceriesListObj = {
    ...groceriesList,
  };

  //update groceries_list document
  await updateDoc(reference, {
    name: formData.name,
    description: formData.description,
  });

  //groceriesList to update state
  groceriesListObj.name = formData.name;
  groceriesListObj.description = formData.description;

  return groceriesListObj;
};

/**
 * Returns updated userLists
 * @param {object} groceriesList - updated groceries list
 * @param {array} userLists - array of groceries list
 * @returns {array} - array of groceries list to update state
 */
export const updateUserLists = (groceriesList, userLists) => {
  validateObject(groceriesList, "groceriesList");
  validateArray(userLists, "userLists");

  //userList to update state
  const userListsObj = userLists.map((list) => {
    if (list.id === groceriesList.id) {
      return {
        ...groceriesList,
        name: groceriesList.name,
        description: groceriesList.description,
      };
    }

    return list;
  });

  return userListsObj;
};

/**
 * Deletes groceries_list document and associated item documents by given id
 * @param {string} listId - groceries_list document id
 * @param {array} userLists - array of groceries list
 * @returns {array} - array of groceries list to update state
 */
export const deleteGroceryListById = async (listId, userLists) => {
  validateString(listId, "listId");
  validateArray(userLists, "userLists");

  const document = await getDocumentRefSnapShot("groceries_list", listId);
  const reference = document.reference;
  const snapShot = document.snapShot;
  validateGroceriesListSnapShot(snapShot, listId);

  const itemsRefs = snapShot.data().items_list;

  //delete all associated item documents
  for (const item of itemsRefs) {
    await deleteDoc(item);
  }

  //delete groceries_list document
  await deleteDoc(reference);

  //userList to update state
  const userListsObj = userLists.filter((list) => list.id !== listId);

  return userListsObj;
};

/**
 * Validates if groceries list form data is valid
 * @param {object} formData - groceries list form data
 */
const validateGroceriesLisFormData = (formData) => {
  if (!formData) {
    throw new Error("Invalid groceries list form data object");
  }

  validateString(formData.name, "groceries list name");
  validateString(formData.description, "groceries list description");

  return;
};

/**
 * Validates if groceries_list document exists
 * @param {object} snapShot - groceries_list snapshot
 * @param {string} listId - id of the groceries list document
 * @throws {Error} if groceries_list snapshot doesn't exist
 */
export const validateGroceriesListSnapShot = (snapShot, listId) => {
  if (!snapShot.exists()) {
    throw new Error(`Groceries List with id: ${listId} not found`);
  }

  return;
};

/**
 * Validates if items document exists
 * @param {object} snapShot - items snapshot
 * @param {string} itemId - id of the item document
 * @throws {Error} if items snapshot doesn't exist
 */
export const validateItemSnapShot = (snapShot, itemId) => {
  if (!snapShot.exists()) {
    throw new Error(`Item with id: ${itemId} not found`);
  }

  return;
};

/**
 * Validates if categories document exists
 * @param {object} snapShot - categories snapshot
 * @param {string} listId - id of the categories document
 * @throws {Error} if categories snapshot doesn't exist
 */
export const validateCategoriesSnapShot = (snapShot, categoryId) => {
  if (!snapShot.exists()) {
    throw new Error(`Item category with id: ${categoryId} not found`);
  }

  return;
};
