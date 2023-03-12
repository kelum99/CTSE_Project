import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { Card, Text, Button, IconButton, Checkbox } from "react-native-paper";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e2944",
    title: "Fourth Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-445571e2944",
    title: "Fifth Item",
  },
];

const Item = ({ title, id }) => {
  const [amount, setAmount] = useState(1);
  const unitPrice = 500.0;
  const [price, setPrice] = useState(unitPrice * amount);
  const [selectedId, setSelectedId] = useState();
  const [checked, setChecked] = React.useState(false);

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
        status={checked ? "checked" : "unchecked"}
        onPress={() => {
          setChecked(!checked);
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
            <Text variant="titleMedium">{title}</Text>
            <Text variant="bodyMedium">1kg @ Rs 500 </Text>
          </View>
          <IconButton
            icon="trash-can"
            iconColor="#D22B2B"
            size={25}
            onPress={() => {
              setSelectedId(id);
              console.log(id);
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
              disabled={amount - 1 < 1}
              icon="minus-circle"
              iconColor="#006E00"
              size={30}
              onPress={() => {
                setAmount(amount - 1);
                setPrice((amount - 1) * unitPrice);
              }}
            />
            <Text style={{ fontSize: 22, paddingTop: "12%" }}>{amount}</Text>

            <IconButton
              icon="plus-circle"
              iconColor="#006E00"
              size={30}
              onPress={() => {
                setAmount(amount + 1);
                setPrice((amount + 1) * unitPrice);
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
          icon="check"
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          Select All
        </Button>
        <Button
          icon="cart-variant"
          mode="contained"
          onPress={() => console.log("Pressed")}
          style={{ backgroundColor: "#D22B2B" }}
        >
          Empty Cart
        </Button>
      </View>
      <FlatList
        style={styles.cartItemList}
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} id={item.id} />}
        keyExtractor={(item) => item.id}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 22, padding: "6%" }}>Total Amount </Text>
        <Text style={{ fontSize: 22, padding: "6%" }}>Rs 1000 </Text>
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
