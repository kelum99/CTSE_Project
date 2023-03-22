import { db } from "../../firebaseConfig";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

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
