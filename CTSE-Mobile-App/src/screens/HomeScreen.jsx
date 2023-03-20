import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { SafeAreaView } from "react-native";
import { Button, Text } from "react-native-paper";
import { useUserInfo } from "../services/Application";
import { getAllUsers, getUserById } from "../services/UserService";

const HomeScreen = ({ navigation }) => {
  const user = useUserInfo();
  const logout = async () => {
    await AsyncStorage.removeItem("user");
    navigation.reset({ index: 0, routes: [{ name: "AuthStack" }] });
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", paddingHorizontal: 15, flex: 1 }}
    >
      <Text variant="headlineMedium">{`Hello, ${
        user.user.role === "customer" ? user.user.firstname : user.user.name
      }`}</Text>
      <Button style={{ marginVertical: 30 }} onPress={logout} mode="contained">
        LogOut
      </Button>
      <Button
        style={{ marginVertical: 30 }}
        onPress={() => navigation.navigate("AllUserScreen")}
        mode="contained"
      >
        All
      </Button>
      <Button
        style={{ marginVertical: 30 }}
        onPress={() => getUserById(user.id)}
        mode="contained"
      >
        Test
      </Button>
    </SafeAreaView>
  );
};

export default HomeScreen;
