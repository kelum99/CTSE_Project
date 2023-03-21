import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { TextInput, Button, HelperText, Text } from "react-native-paper";
import RcFieldForm from "rc-field-form";
import { login } from "../services/UserService";
import { updateUser } from "../services/Application";

const Login = ({ navigation }) => {
  const [validEmail, setIsValidEmail] = useState(true);
  const [form] = RcFieldForm.useForm();
  const newUser = updateUser();

  const onSubmit = async (values) => {
    const res = await login(values);
    console.log("ssss", res);
    if (res) {
      newUser.updateUser(res);
      navigation.reset({ index: 0, routes: [{ name: "TabNavigation" }] });
    }
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff", paddingHorizontal: 10, flex: 1 }}
    >
      <View>
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
              mode="outlined"
              placeholder={"Enter Password"}
              textContentType="password"
            />
          </RcFieldForm.Field>
        </RcFieldForm>
        <Button mode="text" onPress={() => navigation.navigate("SelectScreen")}>
          New user? Register
        </Button>
        <Button
          onPress={() => form.submit()}
          style={{ marginVertical: 30 }}
          mode="contained"
        >
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Login;
