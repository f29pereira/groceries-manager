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

import { formatDate, getDocumentRefSnapShot } from "../../../utils/utils";

/**
 * Creates a new document on the groceries_list collection
 * @param {string} userId - authenticated user id
 * @param {array} userLists - array of groceries list
 * @returns {array} - array of groceries list to update state
 */
export const addEmptyGroceryList = async (userId, formData, userLists) => {
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
    items_list: [],
    itemCount: 0,
    created_at: formatDate(date),
  };

  let updatedUserLists = userLists;
  updatedUserLists.push(groceryListObj);

  return updatedUserLists;
};

/**
 * Queries all the groceries_list documents for given user id
 * @param {userId} userId  - authenticated user id
 * @returns {object} - result of the query
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
 * Fetches all groceries_list documents of the autenticated user
 * @param {string} userId - authenticated user id
 * @returns {object} - user lists
 */
export const fetchAllUserLists = async (userId) => {
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
      const date = formatDate(list.data.created_at);

      userListsCopy.push({
        id: list.id,
        name: list.data.name,
        created_at: date,
        description: list.data.description,
        itemCount: itemsLength,
      });
    }
  }

  return userListsCopy.reverse();
};

/**
 * Fetches groceries_list document by given id
 * @param {string} listId - groceries_list document id
 * @returns {object} - object with grocery list data
 */
export const fetchGroceryListById = async (listId) => {
  const groceryListToCopy = {
    id: "",
    name: "",
    description: "",
    items_list: [],
    itemsCount: "",
    created_at: "",
  };

  const document = await getDocumentRefSnapShot("groceries_list", listId);
  const snapShot = document.snapShot;

  if (snapShot.exists()) {
    groceryListToCopy.id = listId;
    groceryListToCopy.name = snapShot.data().name;
    groceryListToCopy.description = snapShot.data().description;
    groceryListToCopy.created_at = formatDate(snapShot.data().created_at);

    //items document references
    const itemsList = snapShot.data().items_list;

    groceryListToCopy.itemsCount = itemsList.length;

    if (itemsList.length > 0) {
      for (const item of itemsList) {
        let itemId = "";
        let itemName = "";
        let itemQuantity = "";
        let categoryId = "";
        let categoryName = "";
        let categoryColor = "";

        const itemSnapShot = await getDoc(item);

        if (itemSnapShot.exists()) {
          itemId = itemSnapShot.id;
          itemName = itemSnapShot.data().name;
          itemQuantity = itemSnapShot.data().quantity;

          //grocery_categories document references
          const categoryRef = itemSnapShot.data().grocery_categories_id;
          const categorySnapshot = await getDoc(categoryRef);

          if (categorySnapshot.exists()) {
            categoryId = categorySnapshot.id;
            categoryName = categorySnapshot.data().name;
            categoryColor = categorySnapshot.data().color;
          }
        }

        groceryListToCopy.items_list.push({
          id: itemId,
          name: itemName,
          quantity: itemQuantity,
          category_id: categoryId,
          category_name: categoryName,
          category_color: categoryColor,
        });
      }
    }
  }

  return groceryListToCopy;
};

/**
 * Fetches groceries_list document name/description fields by given id
 * @param {string} listId - groceries_list document id
 * @returns {object} - object with name/description fields
 */
export const fetchGroceryListNameDescById = async (listId) => {
  const groceryListToCopy = {
    name: "",
    description: "",
  };

  const document = await getDocumentRefSnapShot("groceries_list", listId);
  const snapShot = document.snapShot;

  if (snapShot.exists()) {
    groceryListToCopy.name = snapShot.data().name;
    groceryListToCopy.description = snapShot.data().description;
  }

  return groceryListToCopy;
};

/**
 * Updates groceries_list document name/description fields by given id
 * @param {object} groceriesList  - groceries list to be updated
 * @param {object} formData  - grocery list form data
 * @returns {object} - groceries list object to update state
 */
export const updateGroceryList = async (groceriesList, formData) => {
  const groceriesListObj = {
    ...groceriesList,
  };

  const document = await getDocumentRefSnapShot(
    "groceries_list",
    groceriesList.id
  );
  const reference = document.reference;
  const snapShot = document.snapShot;

  if (snapShot.exists()) {
    //update groceries_list document
    await updateDoc(reference, {
      name: formData.name,
      description: formData.description,
    });

    //groceriesList to update state
    groceriesListObj.name = formData.name;
    groceriesListObj.description = formData.description;
  }

  return groceriesListObj;
};

/**
 * Deletes groceries_list document and associated item documents by given id
 * @param {string} listId - groceries_list document id
 * @param {array} userLists - array of groceries list
 * @returns {array} - array of groceries list to update state
 */
export const deleteGroceryListById = async (listId, userLists) => {
  const userListsObj = [];

  const document = await getDocumentRefSnapShot("groceries_list", listId);
  const reference = document.reference;
  const snapShot = document.snapShot;

  if (snapShot.exists()) {
    const itemsRefs = snapShot.data().items_list;

    //delete associated item documents
    for (const item of itemsRefs) {
      await deleteDoc(item);
    }

    //delete groceries_list document
    await deleteDoc(reference);

    //userList to update state
    const userListsObj = userLists.filter((list) => list.id !== listId);
  }

  return userListsObj;
};
