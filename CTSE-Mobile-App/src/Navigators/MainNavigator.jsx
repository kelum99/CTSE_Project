import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import CustomerRegisterScreen from "../screens/Register/CustomerRegisterScreen";
import PaymentScreen from "../screens/Payment/PaymentScreen";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          options={{ headerShown: false }}
          name="CustomerRegister"
          component={CustomerRegisterScreen}
        /> */}
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
