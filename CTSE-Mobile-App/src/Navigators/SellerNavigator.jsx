import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewScreen from "../screens/Seller/ViewScreen";
import AddProductScreen from "../screens/Seller/AddProductScreen";
import ProductViewScreen from "../screens/Seller/ProductViewScreen";
const Stack = createNativeStackNavigator();

const SellerNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ProductScreen">
      <Stack.Screen
        options={{ headerTitle: "Fruits", headerTitleAlign: "center" }}
        name="ProductScreen"
        component={ViewScreen}
      />
      <Stack.Screen
        options={{ headerTitle: "Add Fruit", headerTitleAlign: "center" }}
        name="AddProductScreen"
        component={AddProductScreen}
      />
      <Stack.Screen
        options={{ headerTitle: "View Fruit", headerTitleAlign: "center" }}
        name="FruitViewScreen"
        component={ProductViewScreen}
      />
    </Stack.Navigator>
  );
};

export default SellerNavigator;
