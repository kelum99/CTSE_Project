import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Text, Card } from "react-native-paper";
import { useUserInfo } from "../../services/Application";
import { getProductById } from "../../services/SellerService";

const DetailText = (props) => {
  return (
    <View style={{ marginVertical: 5 }}>
      <Text
        style={{
          color: "rgb(0, 110, 0)",
          fontWeight: "500",
          marginVertical: 4,
        }}
      >
        {props.lable}
      </Text>
      <Text style={{ fontWeight: "bold" }} variant="titleMedium">
        {props.value}
      </Text>
    </View>
  );
};

const ProductViewScreen = ({ route }) => {
  // const user = useUserInfo();
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  const getProduct = useCallback(async () => {
    const res = await getProductById(productId);
    setProduct(res);
  });
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        flex: 1,
        paddingTop: 22,
      }}
    >
      <Card>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Content>
          <Text style={{ marginTop: 10 }} variant="titleLarge">
            Apple
          </Text>
          <DetailText
            lable={"Description"}
            value={"this is test description"}
          />
          <DetailText lable={"Quantity"} value={"1000"} />
          <DetailText lable={"Price (1KG)"} value={"250 LKR"} />
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
};
export default ProductViewScreen;
