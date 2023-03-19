import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PaymentScreen from "../screens/Payment/PaymentScreen";
import PayListScreen from "../screens/Payment/PayListScreen";

const Stack = createNativeStackNavigator();

const PaymentNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="PayListScreen">
            <Stack.Screen
                name="PayListScreen"
                options={{
                    headerTitle: "Pay",
                    headerTitleAlign: "center",
                }}
                component={PayListScreen}
            />

            <Stack.Screen
                name="PaymentScreen"
                options={{
                    headerTitle: "Payment",
                    headerTitleAlign: "center",
                }}
                component={PaymentScreen}
            />
        </Stack.Navigator>
    );
};

export default PaymentNavigator;
