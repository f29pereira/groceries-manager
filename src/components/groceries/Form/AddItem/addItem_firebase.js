import { db } from "../../../../firebase/firebase";
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

/**
 * Updates or creates grocery list with item
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
    console.log("Current user have grocery list");

    const groceryListId = querySnapshot.docs[0].id;

    const groceryListRef = doc(db, "groceries_list", groceryListId);

    //update grocery list with new item
    await updateDoc(groceryListRef, {
      items: arrayUnion(itemObj),
    });
  } else {
    console.log("Current user doesn't have grocery list");
    //create grocery list with item
    const groceryId = `${userId}_${new Date().toISOString()}`;

    await setDoc(doc(db, "groceries_list", groceryId), {
      user_id: userId,
      items: [itemObj],
    });
  }
};
