import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CartNavigator from "./CartNavigator";
import HomeNavigator from "./HomeNavigator";
import OtherNavigator from "./OtherNavigator";
import UserProfile from "../screens/User Management/UserProfile";
import SellerNavigator from "../Navigators/SellerNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "rgb(0, 110, 0)"
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          }
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="cart" size={size} color={color} />;
          }
        }}
      />

      <Tab.Screen
        name="Seller"
        component={SellerNavigator}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="cart" size={size} color={color} />;
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account" size={size} color={color} />;
          }
        }}
        initialParams={{ admin: false, userId: undefined }}
      />
      <Tab.Screen
        name="Settings"
        component={OtherNavigator}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="cog" size={size} color={color} />;
          }
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
