import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerRegisterScreen from "../screens/Register/CustomerRegisterScreen";
import SellerRegisterScreen from "../screens/Register/SellerRegisterScreen";
import SelectScreen from "../screens/Register/SelectScreen";
import Login from "../screens/Login";
import SplashScreen from "../screens/SplashScreen";
const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        options={{ headerTitle: "Register", headerTitleAlign: "center" }}
        name="CustomerRegisterScreen"
        component={CustomerRegisterScreen}
      />
      <Stack.Screen
        options={{ headerTitle: "Register", headerTitleAlign: "center" }}
        name="SellerRegisterScreen"
        component={SellerRegisterScreen}
      />
      <Stack.Screen
        options={{ headerTitle: "Login", headerTitleAlign: "center" }}
        name="LoginScreen"
        component={Login}
      />
      <Stack.Screen
        options={{ headerTitle: "", headerTitleAlign: "center" }}
        name="SelectScreen"
        component={SelectScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
