import React, { useRef, useState } from "react";
import { SafeAreaView, View } from "react-native";
import RcFieldForm from "rc-field-form";
import { Button, HelperText, TextInput } from "react-native-paper";
import { AddProduct } from "../../services/SellerService";
import { useUserInfo } from "../../services/Application";
const AddProductScreen = ({ navigation }) => {
  const user = useUserInfo();
  const ref_name = useRef();
  const ref_price = useRef();
  const ref_description = useRef();
  const ref_quantity = useRef();

  const [form] = RcFieldForm.useForm();

  const onSubmit = async values => {
    const product = { ...values, userId: user.id };
    const res = await AddProduct(product);
    if (res) {
      navigation.navigate("ViewScreen");
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", paddingHorizontal: 10, flex: 1 }}
    >
      <RcFieldForm
        onFinishFailed={value => {
          console.log("errors", value.errorFields);
        }}
        component={View}
        form={form}
        onFinish={values => {
          onSubmit(values);
        }}
      >
        <RcFieldForm.Field
          rules={[{ required: true }]}
          name="name"
          trigger={"onChangeText"}
          validateTrigger={"onChangeText"}
        >
          <TextInput
            label={"Name"}
            ref={ref_name}
            mode="outlined"
            placeholder={"Enter Name"}
          />
        </RcFieldForm.Field>

        <RcFieldForm.Field
          rules={[{ required: true }]}
          name="price"
          trigger={"onChangeText"}
          validateTrigger={"onChangeText"}
        >
          <TextInput
            label={"Price"}
            ref={ref_price}
            mode="outlined"
            placeholder={"Enter Price"}
          />
        </RcFieldForm.Field>

        <RcFieldForm.Field
          rules={[{ required: true }]}
          name="description"
          trigger={"onChangeText"}
          validateTrigger={"onChangeText"}
        >
          <TextInput
            label={"Description"}
            ref={ref_description}
            mode="outlined"
            placeholder={"Enter Description"}
          />
        </RcFieldForm.Field>

        <RcFieldForm.Field
          rules={[{ required: true }]}
          name="quantity"
          trigger={"onChangeText"}
          validateTrigger={"onChangeText"}
        >
          <TextInput
            label={"Quantity"}
            ref={ref_quantity}
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
        Add Fruit
      </Button>
    </SafeAreaView>
  );
};

export default AddProductScreen;
