import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, View, TouchableWithoutFeedback } from "react-native";
import {
  Button,
  List,
  Text,
  IconButton,
  Dialog,
  Portal
} from "react-native-paper";
import { getAllProductByUserId } from "../../services/SellerService";
import { useUserInfo } from "../../services/Application";

const ViewScreen = ({ navigation }) => {
  const user = useUserInfo();
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    // setSelectedUser(undefined);
    setVisible(false);
  };

  const getProduct = useCallback(async () => {
    const res = await getAllProductByUserId(user.id);
    setProducts(res);
    console.log("product", res);
  });
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", paddingHorizontal: 10, flex: 1 }}
    >
      <Button
        style={{ marginVertical: 10 }}
        onPress={() => navigation.navigate("AddProductScreen")}
        mode="contained"
      >
        Add Fruit
      </Button>

      <View>
        {products.map(product => (
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate("ViewScreen", {
                productId: product.id
              })
            }
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 4,
                paddingHorizontal: 8
              }}
            >
              <View
                style={{
                  display: "flex"
                }}
              >
                <Text variant="titleMedium">{product.name}</Text>
                <Text>{product.description}</Text>
              </View>
              <IconButton
                icon="delete"
                iconColor={"red"}
                size={20}
                onPress={() => {
                  setVisible(true);
                  // setSelectedUser(user);
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={onClose}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure to remove this fruit ?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onClose}>Cancel</Button>
            <Button mode="contained" buttonColor="red">
              Remove
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

export default ViewScreen;
// {product.map(product => (
//   <div>
//     <List.Item
//       name={product.name}
//       price
//       n={product.price}
//       description={product.description}
//       quantity={product.quantity}
//       left={props => <List.Icon {...props} icon="folder" />}
//     />
//   </div>
// ))}
