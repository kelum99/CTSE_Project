import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, View, TouchableWithoutFeedback } from "react-native";
import {
  Button,
  List,
  Text,
  IconButton,
  Dialog,
  Portal,
} from "react-native-paper";
import {
  getAllProductByUserId,
  deleteProduct,
} from "../../services/SellerService";
import { useUserInfo, useEvents } from "../../services/Application";

const ViewScreen = ({ navigation }) => {
  const user = useUserInfo();
  const event = useEvents();
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();

  const getProduct = useCallback(async () => {
    const res = await getAllProductByUserId(user.id);
    setProducts(res);
    console.log("product", res);
  });

  const onClose = () => {
    setSelectedProduct(undefined);
    setVisible(false);
  };

  const onDelete = async () => {
    if (selectedProduct) {
      const res = await deleteProduct(selectedProduct.id);
      if (res) {
        setVisible(false);
        setSelectedProduct(undefined);
        getProduct();
      }
    }
  };

  useEffect(() => {
    getProduct();
    const handler = () => {
      getProduct();
    };
    event.on("GET_PRODUCTS", handler);
    return () => {
      event.off("GET_PRODUCTS", handler);
    };
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
        {products.map((product) => (
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate("ProductViewScreen", {
                productId: product.id,
              })
            }
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 4,
                paddingHorizontal: 8,
              }}
            >
              <View
                style={{
                  display: "flex",
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
                  setSelectedProduct(product);
                  setVisible(true);
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
            <Button mode="contained" buttonColor="red" onPress={onDelete}>
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
