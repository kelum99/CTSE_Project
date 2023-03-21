import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AddToCart from "../screens/Cart/AddToCart";
import Cart from "../screens/Cart/Cart";
import CartNavigator from "./CartNavigator";
import HomeNavigator from "./HomeNavigator";
import PaymentNavigator from "./PaymentNavigator";
import PayListScreen from "../screens/Payment/PayListScreen";
import OtherNavigator from "./OtherNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "rgb(0, 110, 0)",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="cart" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Products"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="fruit-cherries" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={OtherNavigator}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="cog" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
