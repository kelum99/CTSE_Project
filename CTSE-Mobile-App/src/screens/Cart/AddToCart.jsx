import React, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, View } from "react-native";
import { Card, Text, Button, IconButton } from "react-native-paper";
import { db } from "../../../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useUserInfo } from "../../services/Application";

const AddToCart = ({ navigation }) => {
  const [amount, setAmount] = useState(1);
  const unitPrice = 500.0;
  const [price, setPrice] = useState(unitPrice * amount);
  const user = useUserInfo();
  const [items, setCartItems] = useState([]);

  const item = [
    {
      itemId: "001",
      itemName: "Mango",
      description: "MangoMangoMangoMangoMangoMangoMangoMangoMango",
      qty: 2,
      itemPrice: 200,
      selected: false,
    },
    {
      itemId: "002",
      itemName: "Banana",
      description: "BananaBananaBananaBananaBananaBanana",
      qty: 1,
      itemPrice: 100,
      selected: false,
    },
  ];

  const newItem = {
    itemId: "003",
    itemName: "Strawberry",
    description: "StrawberryStrawberryStrawberryStrawberryStrawberryStrawberry",
    qty: amount,
    itemPrice: price,
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

    items.push(newItem);

    if (cartSnap.exists()) {
      updateDoc(cartRef, {
        cartItems: items,
      });
    } else {
      setDoc(doc(db, "cart", user.user.email), {
        cartId: user.user.email,
        cartItems: item,
      });
    }
    fetchCartItems();
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", paddingHorizontal: 1, flex: 1 }}
    >
      <View style={styles.imgCard}>
        <Image
          style={styles.stretch}
          source={{
            uri: "https://i.pinimg.com/564x/3a/40/ca/3a40ca2d873095b54a1809725764ff18.jpg",
          }}
        />
      </View>
      <Card style={styles.descCard} mode="elevated" elevation={10}>
        <Card.Content>
          <Text variant="headlineLarge">Avacado - Medium</Text>
          <Text variant="headlineSmall" style={styles.cardSubtitle}>
            1pc (500g - 700g)
          </Text>
          <Text variant="bodyLarge" style={{ paddingTop: "5%" }}>
            The avocado is a medium-sized, evergreen tree in the laurel family.
            It is native to the Americas and was first domesticated by
            Mesoamerican tribes more than 5,000 years ago. Then as now it was
            prized for its large and unusually oily fruit
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
                  setPrice((amount - 1) * unitPrice);
                }}
              />
              <Text style={{ fontSize: 32, paddingTop: "5%" }}>{amount}</Text>

              <IconButton
                icon="plus-circle"
                iconColor="#006E00"
                size={50}
                onPress={() => {
                  setAmount(amount + 1);
                  setPrice((amount + 1) * unitPrice);
                }}
              />
            </View>
            <Text style={{ fontSize: 28, paddingTop: "5%" }}>Rs {price}</Text>
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
