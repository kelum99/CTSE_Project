import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { SafeAreaView } from "react-native";
import { Button, Text } from "react-native-paper";
import { useUserInfo } from "../services/Application";

const OtherScreen = ({ navigation }) => {
  const user = useUserInfo();
  const logout = async () => {
    await AsyncStorage.removeItem("user");
    navigation.reset({ index: 0, routes: [{ name: "AuthStack" }] });
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", paddingHorizontal: 15, flex: 1 }}
    >
      <Button
        style={{ marginVertical: 30 }}
        onPress={() => navigation.navigate("PaymentNavigator")}
        mode="contained"
      >
        My Wallet
      </Button>
      {user.user.role === "admin" && (
        <Button
          style={{ marginVertical: 30 }}
          onPress={() => navigation.navigate("AllUserScreen")}
          mode="contained"
        >
          User Management
        </Button>
      )}
      <Button style={{ marginVertical: 30 }} onPress={logout} mode="contained">
        LogOut
      </Button>
    </SafeAreaView>
  );
};

export default OtherScreen;
