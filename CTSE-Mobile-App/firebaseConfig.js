// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJmAt9srupayPt50ZnQJcK4R0xQNkWwAY",
  authDomain: "ctse-project-e0edb.firebaseapp.com",
  projectId: "ctse-project-e0edb",
  storageBucket: "ctse-project-e0edb.appspot.com",
  messagingSenderId: "26696081949",
  appId: "1:26696081949:web:704d3c572394c9c03f1cf4",
  measurementId: "G-476328VV3F",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
