import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Text, Card, TextInput } from "react-native-paper";
import { useEvents } from "../../services/Application";
import { getProductById, updateProduct } from "../../services/SellerService";
import RcFieldForm from "rc-field-form";
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
  const event = useEvents();
  const { productId } = route.params;
  const [product, setProduct] = useState();
  const [edit, setEdit] = useState(false);
  const [form] = RcFieldForm.useForm();
  const getProduct = useCallback(async () => {
    const res = await getProductById(productId);
    setProduct(res);
  });

  const onSubmit = async (values) => {
    const id = product.id;
    delete product.id;
    const updatedData = { ...product, ...values };
    const res = updateProduct(id, updatedData);
    if (res) {
      event.emit("GET_PRODUCTS");
      getProduct();
      setEdit(false);
    }
  };
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
      <Button
        onPress={() => setEdit(!edit)}
        style={{ alignSelf: "flex-end", marginBottom: 10 }}
      >
        {edit ? " Cancel" : "Edit"}
      </Button>
      {edit ? (
        <View>
          <Text
            style={{ marginVertical: 10, textAlign: "center" }}
            variant="titleLarge"
          >
            Update Fruit
          </Text>
          <RcFieldForm
            onFinishFailed={(value) => {
              console.log("errors", value.errorFields);
            }}
            component={View}
            form={form}
            onFinish={(values) => {
              onSubmit(values);
            }}
          >
            <RcFieldForm.Field
              initialValue={product.name}
              rules={[{ required: true }]}
              name="name"
              trigger={"onChangeText"}
              validateTrigger={"onChangeText"}
            >
              <TextInput
                style={{ marginVertical: 8 }}
                label={"Name"}
                mode="outlined"
                placeholder={"Enter Name"}
              />
            </RcFieldForm.Field>

            <RcFieldForm.Field
              initialValue={product.description}
              rules={[{ required: true }]}
              name="description"
              trigger={"onChangeText"}
              validateTrigger={"onChangeText"}
            >
              <TextInput
                style={{ marginVertical: 8 }}
                label={"Description"}
                mode="outlined"
                placeholder={"Enter Description"}
              />
            </RcFieldForm.Field>

            <RcFieldForm.Field
              initialValue={product.price}
              rules={[{ required: true }]}
              name="price"
              trigger={"onChangeText"}
              validateTrigger={"onChangeText"}
            >
              <TextInput
                style={{ marginVertical: 8 }}
                label={"Price"}
                mode="outlined"
                placeholder={"Enter Price"}
              />
            </RcFieldForm.Field>

            <RcFieldForm.Field
              style={{ marginVertical: 8 }}
              initialValue={product.quantity}
              rules={[{ required: true }]}
              name="quantity"
              trigger={"onChangeText"}
              validateTrigger={"onChangeText"}
            >
              <TextInput
                label={"Quantity"}
                mode="outlined"
                placeholder={"Enter Quantity"}
              />
            </RcFieldForm.Field>
          </RcFieldForm>
          <Button
            style={{ marginVertical: 30 }}
            onPress={() => form.submit()}
            mode="contained"
          >
            Update
          </Button>
        </View>
      ) : (
        <View>
          {product && (
            <Card>
              <Card.Cover source={{ uri: product.imgUrl }} />
              <Card.Content>
                <Text style={{ marginTop: 10 }} variant="titleLarge">
                  {product.name}
                </Text>
                <DetailText lable={"Description"} value={product.description} />
                <DetailText lable={"Quantity"} value={product.quantity} />
                <DetailText lable={"Price (1KG)"} value={product.price} />
              </Card.Content>
            </Card>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};
export default ProductViewScreen;
