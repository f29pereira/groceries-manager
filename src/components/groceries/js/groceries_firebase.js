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
} from "firebase/firestore";

/**
 * Updates or creates collection groceries_list
 * @param {string} userId - authenticated user id
 * @param {object} formData - item form data
 */
export const addItem = async (userId, formData) => {
  const itemObj = {
    name: formData.name,
    quantity: formData.quantity,
    grocery_categories_id: formData.categoryId,
  };

  const userQuery = query(
    collection(db, "groceries_list"),
    where("user_id", "==", userId)
  );
  const querySnapshot = await getDocs(userQuery);

  //Check if user has grocery list
  if (!querySnapshot.empty) {
    const groceryListId = querySnapshot.docs[0].id;
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
    const items = querySnapshot.docs[0].data().items.reverse();

    for (const item of items) {
      const categoryObj = await fetchNameColor(item.grocery_categories_id);

      itemsToCopy.push({
        name: item.name,
        categoryName: categoryObj.name,
        categoryColor: categoryObj.color,
        quantity: item.quantity,
      });
    }
  }

  return itemsToCopy;
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
