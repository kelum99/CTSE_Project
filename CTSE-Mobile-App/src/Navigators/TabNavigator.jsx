import React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import HomeNavigator from "./HomeNavigator";

const TabNavigator = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    { key: "albums", focusedIcon: "album" },
    { key: "recents", focusedIcon: "history" },
    {
      key: "notifications",
      focusedIcon: "bell",
      unfocusedIcon: "bell-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeNavigator,
    albums: HomeNavigator,
    recents: HomeNavigator,
    notifications: HomeNavigator,
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
