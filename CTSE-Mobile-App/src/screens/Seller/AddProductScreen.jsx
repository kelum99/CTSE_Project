import React, { useRef, useState } from "react";
import { SafeAreaView, View } from "react-native";
import RcFieldForm from "rc-field-form";
import { Button, HelperText, TextInput } from "react-native-paper";

const AddProductScreen = ({ navigation }) => {
  //   const [validEmail, setIsValidEmail] = useState(true);

  const ref_name = useRef();
  const ref_price = useRef();
  const ref_description = useRef();
  const ref_quantity = useRef();

  const [form] = RcFieldForm.useForm();

  const onSubmit = values => {
    console.log("ss", values);
  };
  return (
    <SafeAreaView>
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
            textContentType="name"
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
            textContentType="price"
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
            textContentType="description"
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
            textContentType="quantity"
          />
        </RcFieldForm.Field>
      </RcFieldForm>

      <Button
        onPress={() => navigation.navigate("AddProductScreen")}
        mode="contained"
      >
        Add Fruit
      </Button>
    </SafeAreaView>
  );
};

export default AddProductScreen;
