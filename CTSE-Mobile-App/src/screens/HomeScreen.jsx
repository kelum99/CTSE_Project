import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { SafeAreaView } from "react-native";
import { Button, Text } from "react-native-paper";
import { useUserInfo } from "../services/Application";

const HomeScreen = ({ navigation }) => {
  const user = useUserInfo();

  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", paddingHorizontal: 15, flex: 1 }}
    >
      <Text variant="headlineMedium">{`Hello, ${
        user.user.role === "customer" ? user.user.firstname : user.user.name
      }`}</Text>

      <Button
        style={{ marginVertical: 30 }}
        onPress={() => getUserById(user.id)}
        mode="contained"
      >
        Test
      </Button>

      <Button
        onPress={() => navigation.navigate("ViewScreen")}
        mode="contained"
      >
        recents
      </Button>
    </SafeAreaView>
  );
};

export default HomeScreen;
