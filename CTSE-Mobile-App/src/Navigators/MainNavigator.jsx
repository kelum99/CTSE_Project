import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";
import SplashScreen from "../screens/SplashScreen";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          options={{ headerShown: false }}
          name="SplashScreen"
          component={SplashScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AuthStack"
          component={AuthNavigator}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="TabNavigation"
          component={TabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
