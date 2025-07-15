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
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

/**
 * Queries the groceries_list collection for given user id
 * @param {userId} userId  - authenticated user id
 * @returns {object} - result of the query
 */
const getUserGroceryList = async (userId) => {
  const userQuery = query(
    collection(db, "groceries_list"),
    where("user_id", "==", userId)
  );
  const querySnapshot = await getDocs(userQuery);

  return querySnapshot;
};

/**
 * Updates or creates collection groceries_list for given user id
 * @param {string} userId - authenticated user id
 * @param {object} formData - item form data
 */
export const addItem = async (userId, formData) => {
  const itemObj = {
    name: formData.name,
    quantity: formData.quantity,
    grocery_categories_id: formData.categoryId,
  };

  const query = await getUserGroceryList(userId);

  //Check if user has grocery list
  if (!query.empty) {
    const groceryListId = query.docs[0].id;
    const groceryListRef = doc(db, "groceries_list", groceryListId);

    //update grocery list with new item
    await updateDoc(groceryListRef, {
      items: arrayUnion(itemObj),
    });
  } else {
    //create grocery list with item
    const groceryId = `${userId}_${new Date().toISOString()}`;

    await setDoc(doc(db, "groceries_list", groceryId), {
      user_id: userId,
      items: [itemObj],
    });
  }
};

/**
 * Deletes item from groceries_list collection
 * @param {string} userId - authenticated user id
 * @param {object} item - item to be removed
 */
export const removeItem = async (userId, item) => {
  const itemObj = {
    name: item.name,
    quantity: item.quantity,
    grocery_categories_id: item.categoryId,
  };

  const query = await getUserGroceryList(userId);

  if (!query.empty) {
    const groceryListId = query.docs[0].id;
    const groceryListRef = doc(db, "groceries_list", groceryListId);

    //delete item
    await updateDoc(groceryListRef, {
      items: arrayRemove(itemObj),
    });
  }
};

/**
 * Returns all grocery_categories documents
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

/**
 * Fetches groceries_list document of the autenticated user
 * @param {string} userId - authenticated user id
 * @returns {object} - object with grocery list data
 */
export const fetchGroceryList = async (userId) => {
  const itemsToCopy = [];

  const userQuery = query(
    collection(db, "groceries_list"),
    where("user_id", "==", userId)
  );
  const querySnapshot = await getDocs(userQuery);

  if (!querySnapshot.empty) {
    const items = querySnapshot.docs[0].data().items;

    for (const item of items) {
      const categoryId = item.grocery_categories_id;
      const categoryObj = await fetchNameColor(categoryId);
      const itemId = items.indexOf(item);

      itemsToCopy.push({
        id: itemId,
        name: item.name,
        categoryId: categoryId,
        categoryName: categoryObj.name,
        categoryColor: categoryObj.color,
        quantity: item.quantity,
      });
    }
  }

  return itemsToCopy.reverse();
};

/**
 * Returns object with name/color from grocery_categories document
 * @param {string} id - document id
 * @returns {object} - object with name/color
 */
const fetchNameColor = async (id) => {
  const categoryRef = doc(db, "grocery_categories", id);
  const category = await getDoc(categoryRef);

  const categoryData = {
    name: "",
    color: "",
  };

  if (category.exists()) {
    categoryData.name = category.data().name;
    categoryData.color = category.data().color;
  }

  return categoryData;
};
