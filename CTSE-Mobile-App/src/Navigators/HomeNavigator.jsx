import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";

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
    </Stack.Navigator>
  );
};

export default HomeNavigator;
