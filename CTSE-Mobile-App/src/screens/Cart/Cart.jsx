import React, { useState, useEffect, useMemo, useContext } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import { Card, Text, Button, IconButton, Checkbox } from "react-native-paper";
import { useUserInfo } from "../../services/Application";
import { db } from "../../../firebaseConfig";
import {
  deleteDoc,
  doc,
  getDoc,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";

const Item = ({ item }) => {
  const [amount, setAmount] = useState(1);
  const unitPrice = 500.0;
  const [price, setPrice] = useState(unitPrice * amount);
  const [selectedId, setSelectedId] = useState();
  const [checked, setChecked] = React.useState(false);
  const [total, setTotal] = useState(0);
  const [deleteItem, setDeleteItem] = useState();
  const user = useUserInfo();
  let total2 = 0;

  useEffect(() => {
    setChecked(item.selected);
    setAmount(item.qty);
    setPrice(item.itemPrice);
  }, []);

  const handlePlus = async () => {
    setAmount((amount) => amount + 1);
  };

  const removeCartItem = async () => {
    const cartRef = doc(db, "cart", user.user.email);
    const itemToRemove = item;

    await updateDoc(cartRef, {
      cartItems: arrayRemove(itemToRemove),
    })
      .then(() => {
        console.log("Item removed from cart successfully!");
      })
      .catch((error) => {
        console.error("Error removing item:", error);
      });
  };

  const updateItems = async () => {
    const cartRef = doc(db, "cart", user.user.email);
    const cartSnap = await getDoc(cartRef).catch((err) => {
      console.log("errrrrrr", err);
    });

    if (cartSnap.exists()) {
      const data = cartSnap.data();
      const itemArray = data.cartItems;
      const index = itemArray.findIndex((cart) => cart.itemId === item.itemId);
      itemArray[index].qty = amount;
      itemArray[index].itemPrice = price;
      updateDoc(cartRef, {
        cartItems: itemArray,
      });
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "72%",
        maxWidth: "100%",
        padding: "5%",
      }}
    >
      <Checkbox
        status={item.selected ? "checked" : "unchecked"}
        onPress={() => {
          item.selected = !item.selected;
          setChecked(!checked);
          console.log(checked, item.itemId);
          calTotal();
        }}
      />
      <Image
        style={styles.stretch}
        source={{
          uri: "https://i.pinimg.com/564x/e7/74/30/e774300d916fb1cdb5900ecd2ea57867.jpg",
        }}
      />

      <View style={styles.cartCard}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ padding: "5%" }}>
            <Text variant="titleMedium">{item.itemName}</Text>
            <Text variant="bodyMedium">1kg @ Rs 500 </Text>
          </View>
          <IconButton
            icon="trash-can"
            iconColor="#D22B2B"
            size={25}
            onPress={() => {
              setDeleteItem(item);
              setSelectedId(item.itemId);
              console.log(item.itemId);
              removeCartItem();
            }}
          />
        </View>

        <View style={styles.item}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "50%",
              maxWidth: "100%",
              marginRight: "20%",
            }}
          >
            <IconButton
              disabled={item.qty - 1 < 1}
              icon="minus-circle"
              iconColor="#006E00"
              size={30}
              onPress={() => {
                // setAmount(() => {
                //   amount - 1;
                // });
                // setPrice(() => {
                //   (amount - 1) * unitPrice;
                // });
                setAmount(amount - 1);
                setPrice((amount - 1) * unitPrice);
                updateItems();
              }}
            />
            <Text style={{ fontSize: 22, paddingTop: "12%" }}>{amount}</Text>

            <IconButton
              icon="plus-circle"
              iconColor="#006E00"
              size={30}
              onPress={() => {
                handlePlus();
                setPrice((amount + 1) * unitPrice);
                updateItems();
              }}
            />
          </View>
          <Text style={{ fontSize: 22, paddingTop: "6%" }}>Rs {price}</Text>
        </View>
      </View>
    </View>
  );
};

const Cart = ({ navigation }) => {
  const [items, setCartItems] = useState([]);
  const user = useUserInfo();
  // const [total, setTotal] = useState(0);

  const fetchCartItems = async () => {
    const cartRef = doc(db, "cart", user.user.email);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      setCartItems(cartSnap.data().cartItems);
    } else {
      Alert.alert("Cart Is Empty! Please Add Items to View the Cart");
    }
  };

  useEffect(() => {
    fetchCartItems();
    // let total = 0;
    // items.forEach((item) => {
    //   total += item.itemPrice;
    // });
    // setTotal(total);
    // console.log(total);
  }, []);

  const total = useMemo(() => {
    let total = 0;
    items.forEach((item) => {
      total += item.itemPrice;
    });
    console.log(total);
    return total;
  }, [total]);

  const emptyCart = async () => {
    await deleteDoc(doc(db, "cart", user.user.email))
      .then(() => {
        Alert.alert("Cart Emptied !");
      })
      .catch((error) => {
        Alert.alert("Error in deleting cart !");
      });
    await fetchCartItems();
  };

  const selectAll = () => {
    let temp = items.map((item) => {
      return { ...item, selected: true };
    });
    setCartItems(temp);
  };

  const calculateTotalPrice = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: "5%",
        }}
      >
        <Button icon="check" mode="contained" onPress={selectAll}>
          Select All
        </Button>
        <Button
          icon="cart-variant"
          mode="contained"
          onPress={emptyCart}
          style={{ backgroundColor: "#D22B2B" }}
        >
          Empty Cart
        </Button>
      </View>
      <FlatList
        style={styles.cartItemList}
        data={items}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.itemId}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 22, padding: "6%" }}>Total Amount </Text>
        <Text style={{ fontSize: 22, padding: "6%" }}>{total} </Text>
      </View>
      <Button mode="contained" onPress={() => console.log("Pressed")}>
        Checkout
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: "2%",
  },

  cartCard: {
    backgroundColor: "#C0DABB",
    paddingLeft: "2%",
    paddingRight: "4%",
    borderRadius: 20,
    elevation: 30,
    maxWidth: "100%",
  },
  item: {
    flexDirection: "row",
  },
  stretch: {
    width: "40%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default Cart;
