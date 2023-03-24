import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddToCart from "../screens/Cart/AddToCart";
import Cart from "../screens/Cart/Cart";

const CartStack = createNativeStackNavigator();

const CartNavigator = () => {
  return (
    <CartStack.Navigator initialRouteName="Cart">
      <CartStack.Screen
        name="AddToCart"
        options={{
          headerTitle: "AddToCart",
          headerTitleAlign: "center",
        }}
        component={AddToCart}
      />
      <CartStack.Screen
        name="Cart"
        options={{
          headerTitle: "Cart",
          headerTitleAlign: "center",
        }}
        component={Cart}
      />
    </CartStack.Navigator>
  );
};

export default CartNavigator;
