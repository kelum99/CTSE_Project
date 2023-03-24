import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc,
  doc
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
    let product = [];
    const q = query(collection(db, "product"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      const fruit = { id: doc.id, ...doc.data() };
      product.push(fruit);
    });
    return product;
  } catch (e) {
    console.log("error", e);
    return undefined;
  }
};

// export const getProductById = async id => {
//   try {
//     let product;
//     const docRef = doc(db, "product", id);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       console.log("Document data:", docSnap.data());
//       product = docSnap.data();
//     } else {
//       console.log("No such document!");
//       product = undefined;
//     }
//     return product;
//   } catch (e) {
//     console.log("error", e);
//     return undefined;
//   }
// };

export const getAllProductByUserId = async userId => {
  try {
    let product = [];
    const q = query(collection(db, "product"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      const fruit = { id: doc.id, ...doc.data() };
      product.push(fruit);
    });
    return product;
  } catch (e) {
    console.log("error", e);
    return undefined;
  }
};

export const deleteProduct = async id => {
  try {
    await deleteDoc(doc(db, "product", id));
    return true;
  } catch (e) {
    console.log("error", e);
    return undefined;
  }
};

export const getProductById = async id => {
  try {
    let product;
    const docRef = doc(db, "product", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      product = docSnap.data();
    } else {
      console.log("No such document!");
      product = undefined;
    }
    return product;
  } catch (e) {
    console.log("error", e);
    return undefined;
  }
};
