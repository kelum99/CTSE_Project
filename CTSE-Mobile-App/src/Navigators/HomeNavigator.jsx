import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
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
