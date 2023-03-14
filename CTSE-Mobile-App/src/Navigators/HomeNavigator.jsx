import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CustomerRegisterScreen from "../screens/Register/CustomerRegisterScreen";

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
        name="RegisterScreen"
        options={{
          headerTitle: "Register",
          headerTitleAlign: "center",
        }}
        component={CustomerRegisterScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
