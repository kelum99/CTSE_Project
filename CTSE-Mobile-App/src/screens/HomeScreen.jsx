import React from "react";
import { SafeAreaView } from "react-native";
import { Button, Text } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
      <Button
        onPress={() => navigation.navigate("RegisterScreen")}
        mode="contained"
      >
        Test Btn
      </Button>

      <Button
        onPress={() => navigation.navigate("ViewScreen")}
        mode="contained"
      >
        recents
      </Button>
    </SafeAreaView>
  );
};

export default HomeScreen;
