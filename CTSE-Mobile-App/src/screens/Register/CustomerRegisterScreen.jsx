import React, { useRef, useState } from "react";
import { SafeAreaView, View } from "react-native";
import RcFieldForm from "rc-field-form";
import { Button, HelperText, TextInput } from "react-native-paper";
const CustomerRegisterScreen = () => {
  const [validEmail, setIsValidEmail] = useState(true);
  const ref_password = useRef();
  const ref_email = useRef();
  const [form] = RcFieldForm.useForm();

  const onSubmit = (values) => {
    console.log("ss", values);
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
          name="email"
          trigger={"onChangeText"}
          validateTrigger={"onChangeText"}
        >
          <TextInput
            label={"Email"}
            autoFocus={true}
            ref={ref_email}
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
          name="password"
          trigger={"onChangeText"}
          validateTrigger={"onChangeText"}
        >
          <TextInput
            label={"Password"}
            ref={ref_password}
            mode="outlined"
            placeholder={"Enter Password"}
            textContentType="password"
          />
        </RcFieldForm.Field>
      </RcFieldForm>
      <Button
        onPress={() => form.submit()}
        style={{ marginVertical: 10 }}
        mode="contained"
      >
        Register
      </Button>
    </SafeAreaView>
  );
};

export default CustomerRegisterScreen;
