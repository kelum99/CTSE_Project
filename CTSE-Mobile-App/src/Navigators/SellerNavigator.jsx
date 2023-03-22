import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewScreen from "../screens/Seller/ViewScreen";
import AddProductScreen from "../screens/Seller/AddProductScreen";
const Stack = createNativeStackNavigator();

const SellerNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ProductScreen">
      <Stack.Screen
        options={{ headerTitle: "Products", headerTitleAlign: "center" }}
        name="ProductScreen"
        component={ViewScreen}
      />
      <Stack.Screen
        options={{ headerTitle: "Add Product", headerTitleAlign: "center" }}
        name="AddProductScreen"
        component={AddProductScreen}
      />
    </Stack.Navigator>
  );
};

export default SellerNavigator;
