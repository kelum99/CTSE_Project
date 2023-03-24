import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PaymentScreen from "../screens/Payment/PaymentScreen";
import PayListScreen from "../screens/Payment/PayListScreen";
import UpdatePaymentScreen from "../screens/Payment/UpdatePaymentScreen";

const Stack = createNativeStackNavigator();

const PaymentNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="PayListScreen">
      <Stack.Screen
        name="PayListScreen"
        options={{
          headerShown: false,
        }}
        component={PayListScreen}
      />

      <Stack.Screen
        name="PaymentScreen"
        options={{
          headerShown: false,
        }}
        component={PaymentScreen}
      />

      <Stack.Screen
        name="UpdatePaymentScreen"
        options={{
          headerShown: false,
        }}
        component={UpdatePaymentScreen}
      />
    </Stack.Navigator>
  );
};

export default PaymentNavigator;
