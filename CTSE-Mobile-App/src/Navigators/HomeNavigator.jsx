import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CustomerRegisterScreen from "../screens/Register/CustomerRegisterScreen";
import SellerRegisterScreen from "../screens/Register/SellerRegisterScreen";
import SelectScreen from "../screens/Register/SelectScreen";
import Login from "../screens/Login";
import AllUserScreen from "../screens/User Management/AllUsersScreen";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        options={{
          headerTitle: "Home",
          headerTitleAlign: "center",
        }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="CustomerRegisterScreen"
        options={{
          headerTitle: "Register",
          headerTitleAlign: "center",
        }}
        component={CustomerRegisterScreen}
      />
      <Stack.Screen
        name="SellerRegisterScreen"
        options={{
          headerTitle: "Register",
          headerTitleAlign: "center",
        }}
        component={SellerRegisterScreen}
      />
      <Stack.Screen
        name="SelectScreen"
        options={{
          headerTitle: "",
          headerTitleAlign: "center",
        }}
        component={SelectScreen}
      />
      <Stack.Screen
        name="LoginScreen"
        options={{
          headerTitle: "",
          headerTitleAlign: "center",
        }}
        component={Login}
      />
      <Stack.Screen
        name="AllUserScreen"
        options={{
          headerTitle: "User Management",
          headerTitleAlign: "center",
        }}
        component={AllUserScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
