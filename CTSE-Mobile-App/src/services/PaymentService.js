import {db} from "../../firebaseConfig";
import {collection, addDoc, query, where, getDocs, doc, getDoc, deleteDoc, updateDoc} from "firebase/firestore";


export const paymentCustomer = async (values) => {
    try{
        const payment = await addDoc(collection(db,"payments"), {
            CardHolderName: values.CardHolderName,
            CardNumber: values.CardNumber,
            ExpiryDate: values.ExpiryDate,
            CVV: values.CVV,
        });
        return payment;
    } catch (err) {
        console.log("error", err);
        return undefined;
    }
};

export const getAllPayments = async () => {
    try{
        let payments = [];
        const q = query(collection(db,"payments"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const payment = {id: doc.id, ...doc.data() };
            payments.push(payment);
        });
        return payments;
    } catch (e){
        console.log("error", e);
        return undefined;
    }
};

export const getPaymentById = async (id) => {
    try {
        let payment;
        const docRef = doc(db, "payments", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            payment = docSnap.data();
        } else {
            console.log("No such document!");
            payment = undefined;
        }
        return payment;
    } catch (e) {
        console.log("error", e);
        return undefined;
    }
};

export const updatePayment = async (id, updates) => {
    try {
        const docRef = doc(db, "payments", id);
        await updateDoc(docRef, updates);
        return true;
    } catch (e) {
        console.log("error", e);
        return undefined;
    }
};


export const deletePayment = async (id) => {
    try {
        await deleteDoc(doc(db, "payments", id));
        return true;
    } catch (e) {
        console.log("error", e);
        return undefined;
    }
};

