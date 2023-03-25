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

  const updateItems = async (amt, prc) => {
    const cartRef = doc(db, "cart", user.user.email);
    const cartSnap = await getDoc(cartRef).catch((err) => {
      console.log("errrrrrr", err);
    });

    if (cartSnap.exists()) {
      const data = cartSnap.data();
      const itemArray = data.cartItems;
      const index = itemArray.findIndex((cart) => cart.itemId === item.itemId);
      itemArray[index].qty = amt;
      itemArray[index].itemPrice = prc;
      updateDoc(cartRef, {
        cartItems: itemArray,
      });
    }
  };

  const updateSelected = async (check) => {
    const cartRef = doc(db, "cart", user.user.email);
    const cartSnap = await getDoc(cartRef).catch((err) => {
      console.log("errrrrrr", err);
    });

    if (cartSnap.exists()) {
      const data = cartSnap.data();
      const itemArray = data.cartItems;
      const index = itemArray.findIndex((cart) => cart.itemId === item.itemId);
      itemArray[index].selected = check;

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
          updateSelected(!checked);
        }}
      />
      <Image
        style={styles.stretch}
        source={{
          uri: item.imgUrl,
        }}
      />

      <View style={styles.cartCard}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ padding: "5%" }}>
            <Text variant="titleMedium">{item.itemName}</Text>
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
                setAmount(amount - 1);
                setPrice((amount - 1) * unitPrice);
                updateItems(item.qty - 1, (item.qty - 1) * unitPrice);
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
                updateItems(item.qty + 1, (item.qty + 1) * unitPrice);
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
  const [allSelected, setAllSelected] = useState(false);
  const user = useUserInfo();
  const [total, setTotal] = useState();

  const fetchCartItems = async () => {
    const cartRef = doc(db, "cart", user.user.email);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      setCartItems(cartSnap.data().cartItems);
    } else {
      setCartItems([]);
      Alert.alert("Cart Is Empty! Please Add Items to View the Cart");
    }
  };

  useEffect(() => {
    fetchCartItems();
    calcTotal();
  }, [items]);

  const calcTotal = () => {
    let tot = 0;
    items.forEach((item) => {
      if (item.selected) {
        tot += item.itemPrice;
      }
    });
    setTotal(tot);
  };

  const emptyCart = async () => {
    await deleteDoc(doc(db, "cart", user.user.email))
      .then(() => {
        Alert.alert("Cart Emptied !");
        fetchCartItems();
      })
      .catch((error) => {
        Alert.alert("Error in deleting cart !");
      });
    fetchCartItems();
  };

  const selectAll = async () => {
    let temp = items.map((item) => {
      return { ...item, selected: !item.selected };
    });
    // setCartItems(temp);
    setAllSelected(!allSelected);

    const cartRef = doc(db, "cart", user.user.email);
    const cartSnap = await getDoc(cartRef);

    await updateDoc(cartRef, {
      cartItems: temp,
    });
    fetchCartItems();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: "5%",
        }}
      >
        <Button
          icon={allSelected ? "close" : "check"}
          mode="contained"
          onPress={selectAll}
        >
          {allSelected ? "De-Select All" : "Select All"}
        </Button>
        <Button
          icon="cart-variant"
          mode="contained"
          onPress={() => {
            emptyCart();
            fetchCartItems();
          }}
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
        <Text style={{ fontSize: 22, padding: "6%" }}>Rs {total} </Text>
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
