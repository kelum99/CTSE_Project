import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import RcFieldForm from "rc-field-form";
import { Button, HelperText, TextInput } from "react-native-paper";
import { registerSeller } from "../../services/UserService";

const SellerRegisterScreen = ({ navigation }) => {
  const [validEmail, setIsValidEmail] = useState(true);
  const [form] = RcFieldForm.useForm();

  const onSubmit = async (values) => {
    const res = await registerSeller(values);
    if (res) {
      navigation.navigate("LoginScreen");
    }
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", paddingHorizontal: 10, flex: 1 }}
    >
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
          rules={[{ required: true }]}
          name="name"
          trigger={"onChangeText"}
          validateTrigger={"onChangeText"}
        >
          <TextInput
            label={"Name"}
            mode="outlined"
            placeholder={"Enter Name"}
          />
        </RcFieldForm.Field>
        <RcFieldForm.Field
          rules={[{ required: true }]}
          name="storeName"
          trigger={"onChangeText"}
          validateTrigger={"onChangeText"}
        >
          <TextInput
            label={"Store Name"}
            mode="outlined"
            placeholder={"Enter Store Name"}
          />
        </RcFieldForm.Field>
        <RcFieldForm.Field
          rules={[{ required: true }]}
          name="email"
          trigger={"onChangeText"}
          validateTrigger={"onChangeText"}
        >
          <TextInput
            label={"Email"}
            onChangeText={(text) => {
              const mailFormat =
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
              if (text.match(mailFormat)) {
                setIsValidEmail(true);
              } else {
                setIsValidEmail(false);
              }
            }}
            mode="outlined"
            placeholder={"Enter Email"}
            textContentType="emailAddress"
          />
        </RcFieldForm.Field>
        {!validEmail && (
          <HelperText color={"#EE2F36"}>Email not valid!</HelperText>
        )}
        <RcFieldForm.Field
          rules={[{ required: true }]}
          name="mobile"
          trigger={"onChangeText"}
          validateTrigger={"onChangeText"}
        >
          <TextInput
            label={"Mobile"}
            mode="outlined"
            keyboardType="number-pad"
            placeholder={"Enter Mobile Number"}
          />
        </RcFieldForm.Field>
        <RcFieldForm.Field
          rules={[{ required: true }]}
          name="address"
          trigger={"onChangeText"}
          validateTrigger={"onChangeText"}
        >
          <TextInput
            label={"Address"}
            mode="outlined"
            placeholder={"Enter Address"}
          />
        </RcFieldForm.Field>
        <RcFieldForm.Field
          rules={[{ required: true }]}
          name="password"
          trigger={"onChangeText"}
          validateTrigger={"onChangeText"}
        >
          <TextInput
            label={"Password"}
            mode="outlined"
            placeholder={"Enter Password"}
            textContentType="password"
          />
        </RcFieldForm.Field>
      </RcFieldForm>
      <Button
        onPress={() => form.submit()}
        style={{ marginVertical: 30 }}
        mode="contained"
      >
        Register
      </Button>
    </SafeAreaView>
  );
};

export default SellerRegisterScreen;
