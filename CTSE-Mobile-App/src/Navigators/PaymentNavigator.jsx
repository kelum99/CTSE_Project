import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import PaymentScreen from "../screens/PaymentScreen";

const Stack = createNativeStackNavigator();

const PaymentNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="PaymentScreen">
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
