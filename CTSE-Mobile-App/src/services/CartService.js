import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

export const createCart = async (values, id) => {
  try {
    const cart = await setDoc(doc(db, "cart", id), {
      cartId: user.user.email,
      cartItems: values,
    });
    return cart;
  } catch (err) {
    console.log("error", err);
    return undefined;
  }
};

export const updateCart = async (id, values) => {
  try {
    await updateDoc(doc(db, "cart", id), { cartItems: values });
    return true;
  } catch (e) {
    console.log("error", e);
    return undefined;
  }
};

export const getCartItems = async () => {
  try {
    let item = [];
    const q = query(collection(db, "cart"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const fruit = { id: doc.id, ...doc.data() };
      item.push(fruit);
    });
    return item;
  } catch (e) {
    console.log("error", e);
    return undefined;
  }
};

export const getItemById = async (id) => {
  try {
    let item;
    const docRef = doc(db, "cart", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      item = docSnap.data();
    } else {
      console.log("No such document!");
      item = undefined;
    }
    return item;
  } catch (e) {
    console.log("error", e);
    return undefined;
  }
};

export const getCartByUserId = async (userId) => {
  try {
    let cart = [];
    const q = query(collection(db, "cart"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const fruit = { id: doc.id, ...doc.data() };
      cart.push(fruit);
    });
    return cart;
  } catch (e) {
    console.log("error", e);
    return undefined;
  }
};

export const deleteCart = async (id) => {
  try {
    await deleteDoc(doc(db, "cart", id));
    return true;
  } catch (e) {
    console.log("error", e);
    return undefined;
  }
};
