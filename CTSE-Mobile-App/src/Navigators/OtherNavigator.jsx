import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AllUserScreen from "../screens/User Management/AllUsersScreen";
import PaymentNavigator from "./PaymentNavigator";
import OtherScreen from "../screens/OtherScreen";
import UserProfile from "../screens/User Management/UserProfile";

const Stack = createNativeStackNavigator();

const OtherNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="OtherScreen">
      <Stack.Screen
        name="OtherScreen"
        options={{
          headerShown: false,
        }}
        component={OtherScreen}
      />
      <Stack.Screen
        name="AllUserScreen"
        options={{
          headerTitle: "User Management",
          headerTitleAlign: "center",
        }}
        component={AllUserScreen}
      />
      <Stack.Screen
        name="UserProfileScreen"
        options={{
          headerTitle: "User Management",
          headerTitleAlign: "center",
        }}
        component={UserProfile}
      />
      <Stack.Screen
        name="PaymentNavigator"
        options={{
          headerTitle: "My Wallet",
          headerTitleAlign: "center",
        }}
        component={PaymentNavigator}
      />
    </Stack.Navigator>
  );
};

export default OtherNavigator;
