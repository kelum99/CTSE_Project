import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc
} from "firebase/firestore";

export const AddProduct = async values => {
  try {
    const fruit = await addDoc(collection(db, "product"), {
      name: values.name,
      price: values.price,
      description: values.description,
      quantity: values.quantity,
      userId: values.userId
    });
    return fruit;
  } catch (err) {
    console.log("error", err);
    return undefined;
  }
};

export const getAllProduct = async () => {
  try {
    let fruit = [];
    const q = query(collection(db, "product"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      const fruit = { id: doc.id, ...doc.data() };
      product.push(fruit);
    });
    return fruit;
  } catch (e) {
    console.log("error", e);
    return undefined;
  }
};

export const getUserById = async id => {
  try {
    let user;
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      user = docSnap.data();
    } else {
      console.log("No such document!");
      user = undefined;
    }
    return user;
  } catch (e) {
    console.log("error", e);
    return undefined;
  }
};
