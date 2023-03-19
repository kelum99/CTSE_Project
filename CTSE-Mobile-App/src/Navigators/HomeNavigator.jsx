import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CustomerRegisterScreen from "../screens/Register/CustomerRegisterScreen";
import AddProductScreen from "../screens/Seller/AddProductScreen";
import ViewScreen from "../screens/Seller/ViewScreen";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        options={{
          headerTitle: "Home",
          headerTitleAlign: "center"
        }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="CustomerRegisterScreen"
        options={{
          headerTitle: "Register",
          headerTitleAlign: "center"
        }}
        component={CustomerRegisterScreen}
      />

      <Stack.Screen
        name="ViewScreen"
        options={{
          headerTitle: "View Product",
          headerTitleAlign: "center"
        }}
        component={ViewScreen}
      />

      <Stack.Screen
        name="AddProductScreen"
        options={{
          headerTitle: "AddProductScreen",
          headerTitleAlign: "center"
        }}
        component={AddProductScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
