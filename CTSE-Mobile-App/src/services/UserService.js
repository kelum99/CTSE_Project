import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

export const registerCustomer = async values => {
  try {
    const user = await addDoc(collection(db, "users"), {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      address: values.address,
      mobile: values.mobile,
      password: values.password,
      role: "customer"
    });
    return user;
  } catch (err) {
    console.log("error", err);
    return undefined;
  }
};

export const registerSeller = async values => {
  try {
    const user = await addDoc(collection(db, "users"), {
      name: values.name,
      storeName: values.storeName,
      email: values.email,
      address: values.address,
      mobile: values.mobile,
      password: values.password,
      role: "seller"
    });
    return user;
  } catch (err) {
    console.log("error", err);
    return undefined;
  }
};

export const login = async values => {
  try {
    let user;
    const q = query(
      collection(db, "users"),
      where("email", "==", values.email),
      where("password", "==", values.password)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      user = { id: doc.id, user: doc.data() };
    });
    return user;
  } catch (e) {
    console.log("error", e);
    return undefined;
  }
};

export const getAllUsers = async () => {
  try {
    let users = [];
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const user = { id: doc.id, ...doc.data() };
      users.push(user);
    });
    return users;
  } catch (e) {
    console.log("error", e);
    return undefined;
  }
};

export const getUserById = async (id) => {
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

export const deleteUser = async (id) => {
  try {
    await deleteDoc(doc(db, "users", id));
    return true;
  } catch (e) {
    console.log("error", e);
    return undefined;
  }
};
