import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { SafeAreaView, View, Image } from "react-native";
import { Text } from "react-native-paper";

const SplashScreen = ({ navigation }) => {
  const isLogged = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      navigation.reset({ index: 0, routes: [{ name: "TabNavigation" }] });
    } else {
      navigation.reset({ index: 0, routes: [{ name: "AuthStack" }] });
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      isLogged();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#f7f7f7",
        paddingHorizontal: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Image
          style={{ width: 250, height: 250, marginVertical: 16 }}
          source={require("../Images/fruit-logo.png")}
        />
        <Text variant="displayLarge">Fruit Mart</Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
