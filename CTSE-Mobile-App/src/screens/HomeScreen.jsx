import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { useUserInfo } from "../services/Application";
import { getAllProduct } from "../services/SellerService";
import { Searchbar } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  const user = useUserInfo();
  const [fruits, setFruits] = useState([]);
  const [searchText, setSearchText] = React.useState("");

  const getAllFruits = useCallback(async () => {
    const res = await getAllProduct();
    console.log("AA", res);
    setFruits(res);
  }, []);

  useEffect(() => {
    getAllFruits();
  }, []);

  const searchFruits = (text) => {
    if (text) {
      const searcedhData = fruits.filter(function (fruit) {
        const fruitData = fruit.name
          ? fruit.name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return fruitData.indexOf(textData) > -1;
      });
      setFruits(searcedhData);
      setSearchText(text);
    } else {
      getAllFruits();
      setSearchText(text);
    }
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", paddingHorizontal: 10, flex: 1 }}
    >
      <Text
        style={{ textAlign: "center", color: "rgb(0, 110, 0)" }}
        variant="headlineSmall"
      >
        Fruit Mart
      </Text>
      <Searchbar
        style={{ borderRadius: 15, marginBottom: 15, marginTop: 10 }}
        placeholder="Search"
        onChangeText={searchFruits}
        value={searchText}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            gap: 12,
            marginVertical: 10,
          }}
        >
          {fruits.length > 0 && (
            <>
              {fruits.map((fruit) => (
                <Card
                  style={{ width: "47%" }}
                  onPress={() =>
                    navigation.navigate("Cart", {
                      screen: "AddToCart",
                      params: { fruit: fruit },
                    })
                  }
                >
                  <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
                  <Card.Content>
                    <Text style={{ marginTop: 10 }} variant="titleLarge">
                      {fruit.name}
                    </Text>
                    <Text
                      variant="bodyMedium"
                      style={{ fontWeight: "600", color: "rgb(84, 99, 77)" }}
                    >
                      {fruit.price + " LKR"}
                    </Text>
                  </Card.Content>
                </Card>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
