import React from "react";
import { SafeAreaView } from "react-native";
import { Button, Text } from "react-native-paper";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
const HomeScreen = ({ navigation }) => {
  const add = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "adsa",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
      <Button
        onPress={() => navigation.navigate("SelectScreen")}
        mode="contained"
      >
        Test Btn
      </Button>
      <Button
        onPress={() => navigation.navigate("AllUserScreen")}
        mode="contained"
      >
        Test Btn 2
      </Button>
    </SafeAreaView>
  );
};

export default HomeScreen;
