import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddToCart from "../screens/Cart/AddToCart";
import Cart from "../screens/Cart/Cart";
import FAQ from "../screens/Cart/FAQ";

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
      <CartStack.Screen
        name="FAQ"
        options={{
          headerTitle: "FAQ",
          headerTitleAlign: "center",
        }}
        component={FAQ}
      />
    </CartStack.Navigator>
  );
};

export default CartNavigator;
