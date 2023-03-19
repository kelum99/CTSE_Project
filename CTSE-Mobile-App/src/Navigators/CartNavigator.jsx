import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddToCart from "../screens/Cart/AddToCart";

const CartStack = createNativeStackNavigator();

const CartNavigator = () => {
  return (
    <CartStack.Navigator initialRouteName="AddToCart">
      <CartStack.Screen
        name="AddToCart"
        options={{
          headerTitle: "AddToCart",
          headerTitleAlign: "center",
        }}
        component={AddToCart}
      />
    </CartStack.Navigator>
  );
};

export default CartNavigator;
