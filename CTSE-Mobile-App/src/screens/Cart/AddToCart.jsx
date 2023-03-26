import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, View, Alert } from "react-native";
import { Card, Text, Button, IconButton } from "react-native-paper";
import { db } from "../../../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useUserInfo } from "../../services/Application";
import uuid from "react-native-uuid";

const AddToCart = ({ navigation, route }) => {
  const { fruit } = route.params;
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(fruit.price * amount);
  const user = useUserInfo();
  const [items, setCartItems] = useState([]);

  const item = [];

  const newItem = {
    itemId: uuid.v4(),
    itemName: fruit.name,
    description: fruit.description,
    qty: amount,
    itemPrice: price,
    imgUrl: fruit.imgUrl,
    selected: false,
  };

  const fetchCartItems = async () => {
    const cartRef = doc(db, "cart", user.user.email);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      setCartItems(cartSnap.data().cartItems);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const addToCart = async () => {
    const cartRef = doc(db, "cart", user.user.email);
    const cartSnap = await getDoc(cartRef).catch((err) => {
      console.log("error in getting cart", err);
    });
    fetchCartItems();
    items.push(newItem);

    if (cartSnap.exists()) {
      updateDoc(cartRef, {
        cartItems: items,
      });
      Alert.alert("Item Added To Cart");
    } else {
      item.push(newItem);
      setDoc(doc(db, "cart", user.user.email), {
        cartId: user.user.email,
        cartItems: item,
      });
    }
    fetchCartItems();
    Alert.alert("Item Added To Cart");
    navigation.navigate("Cart");
    setAmount(1);
    setPrice(fruit.price * amount);
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", paddingHorizontal: 1, flex: 1 }}
    >
      <View style={styles.imgCard}>
        <Image
          style={styles.stretch}
          source={{
            uri: fruit.imgUrl,
          }}
        />
      </View>
      <Card style={styles.descCard} mode="elevated" elevation={10}>
        <Card.Content>
          <Text variant="headlineLarge">{fruit.name}</Text>
          <Text variant="bodyLarge" style={{ paddingTop: "5%" }}>
            {fruit.description}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "8%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <IconButton
                disabled={amount - 1 < 1}
                icon="minus-circle"
                iconColor="#006E00"
                size={50}
                onPress={() => {
                  setAmount(amount - 1);
                  setPrice((amount - 1) * fruit.price);
                }}
              />
              <Text style={{ fontSize: 32, paddingTop: "5%" }}>{amount}</Text>

              <IconButton
                icon="plus-circle"
                iconColor="#006E00"
                size={50}
                onPress={() => {
                  setAmount(amount + 1);
                  setPrice((amount + 1) * fruit.price);
                }}
              />
            </View>
            <Text style={{ fontSize: 28, paddingTop: "5%" }}>
              Rs {fruit.price * amount}
            </Text>
          </View>
        </Card.Content>

        <Button
          mode="contained"
          style={{
            marginLeft: "10%",
            marginRight: "10%",
            marginTop: "2%",
          }}
          onPress={addToCart}
        >
          Add To Cart
        </Button>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  imgCard: {
    height: "50%",
    width: "100%",
  },
  stretch: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  descCard: {
    height: "50%",
    paddingTop: "2%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  cardSubtitle: {
    color: "#03B056",
    paddingTop: "2%",
  },
});

export default AddToCart;
