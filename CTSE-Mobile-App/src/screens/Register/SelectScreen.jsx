import React from "react";
import { SafeAreaView, View } from "react-native";
import { Button } from "react-native-paper";
const SelectScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", paddingHorizontal: 10, flex: 1 }}
    >
      <View>
        <Button
          onPress={() => navigation.navigate("CustomerRegisterScreen")}
          mode="contained"
          style={{ marginVertical: 10 }}
        >
          Customer
        </Button>
        <Button
          onPress={() => navigation.navigate("SellerRegisterScreen")}
          mode="contained"
          style={{ marginVertical: 10 }}
        >
          Seller
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SelectScreen;
