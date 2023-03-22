import React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import AddToCart from "../screens/Cart/AddToCart";
import Cart from "../screens/Cart/Cart";
import CartNavigator from "./CartNavigator";
import HomeNavigator from "./HomeNavigator";

import PaymentNavigator from "./PaymentNavigator";
import PayListScreen from "../screens/Payment/PayListScreen";
import SellerNavigator from "./SellerNavigator";

const TabNavigator = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline"
    },
    {
      key: "credit",
      focusedIcon: "credit-card",
      unfocusedIcon: "credit-card-outline"
    },
    { key: "cart", focusedIcon: "cart", unfocusedIcon: "cart-outline" },
    {
      key: "notifications",
      focusedIcon: "bell",
      unfocusedIcon: "bell-outline"
    }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeNavigator,
    credit: PayListScreen,
    cart: Cart,
    notifications: SellerNavigator
  });

  return (
    <BottomNavigation
      labeled={false}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default TabNavigator;
