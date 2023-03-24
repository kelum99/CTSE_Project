import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native";
import { Button, Text } from "react-native-paper";
import { useUserInfo } from "../../services/Application";
import { getProductById } from "../../services/SellerService";
import React from "react";

const ProductViewScreen = ({ route }) => {
  // const user = useUserInfo();
  // const [details, setDetails] = useState();
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  const getProduct = useCallback(async () => {
    const res = await getProductById(productId == product.id);
    setDetails(res);
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
        paddingTop: 22
      }}
    >
      {/* {!admin && <Button style={{ alignSelf: "flex-end" }}>Edit</Button>} */}
      {details && (
        <View>
          {/* <Avatar.Text
            style={{ alignSelf: "center", marginVertical: 16 }}
            size={132}
            label={
              details.role === "customer"
                ? details.firstname.charAt(0).toUpperCase()
                : details.name.charAt(0).toUpperCase()
            }
          /> */}
          {/* <DetailText
            lable={details.role === "customer" ? "First Name" : "Name"}
            value={
              details.role === "customer" ? details.firstname : details.name
            }
          />
          <DetailText
            lable={details.role === "customer" ? "Last Name" : "Store Name"}
            value={
              details.role === "customer" ? details.lastname : details.storeName
            }
          /> */}
          <DetailText lable={"Name"} value={details.name} />
          <DetailText lable={"Price"} value={details.price} />
          <DetailText lable={"Description"} value={details.description} />
          <DetailText lable={"Quantity"} value={details.quantity} />
        </View>
      )}
    </SafeAreaView>
  );
};
export default ProductViewScreen;
