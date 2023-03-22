import React from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Text, Card, TextInput } from "react-native-paper";
import RcFieldForm from "rc-field-form";
import { paymentCustomer } from "../../services/PaymentService";

const PaymentScreen = ({ navigation }) => {
  const [form] = RcFieldForm.useForm();

  const onSubmit = async (values) => {
    const res = await paymentCustomer(values);
    if (res) {
      form.resetFields();
      navigation.navigate("PayListScreen");
    }
  };

  // const onFinishFailed = (errorFields) => {
  //     errorFields.forEach((field) => {
  //         const { name, errors } = field;
  //         form.setFields([{ name, errors }]);
  //     });
  // };

  return (
    <SafeAreaView style={{ alignItems: "center" }}>
      <center>
        <Text variant="headlineLarge">Payment</Text>
      </center>

      <br />
      <br />

      <Card style={{ width: "90%", flex: 1, justifyContent: "center" }}>
        <Card.Cover
          style={{ marginBottom: 10 }}
          source={{
            uri: "https://img.freepik.com/free-vector/realistic-monochromatic-credit-card_52683-74366.jpg?w=2000",
          }}
        />

        <RcFieldForm
          onFinishFailed={(value) => {
            console.log("errors", value.errorFields);
          }}
          // onFinishFailed={onFinishFailed}
          component={View}
          form={form}
          onFinish={(values) => {
            onSubmit(values);
          }}
        >
          <RcFieldForm.Field
            rules={[{ required: true }]}
            name="CardHolderName"
            trigger={"onChangeText"}
            validateTrigger={"onChangeText"}
          >
            <TextInput
              style={{
                marginBottom: 10,
                width: "80%",
                height: 50,
                borderRadius: 10,
                alignSelf: "center",
                textAlign: "left",
              }}
              mode="outlined"
              label="Card Holder Name"
              placeholder="Enter Name"
            />
          </RcFieldForm.Field>

          <RcFieldForm.Field
            rules={[
              { required: true },
              {
                validator: (_, value) => {
                  if (!/^\d+$/.test(value)) {
                    return Promise.reject(
                      new Error("Please enter only numbers")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
            name="CardNumber"
            trigger={"onChangeText"}
            validateTrigger={"onChangeText"}
          >
            <TextInput
              style={{
                marginBottom: 10,
                width: "80%",
                height: 50,
                borderRadius: 40,
                alignSelf: "center",
                textAlign: "center",
              }}
              mode="outlined"
              label="Card Number"
              placeholder="XXXX XXXX XXXX XXXX"
              keyboardType="numeric"
            />
          </RcFieldForm.Field>

          <RcFieldForm.Field
            rules={[{ required: true }]}
            name="ExpiryDate"
            trigger={"onChangeText"}
            validateTrigger={"onChangeText"}
          >
            <TextInput
              style={{
                marginBottom: 10,
                width: "80%",
                height: 50,
                borderRadius: 10,
                alignSelf: "center",
                textAlign: "left",
              }}
              mode="outlined"
              label="Expiry Date"
              placeholder="Month/Year"
            />
          </RcFieldForm.Field>

          <RcFieldForm.Field
            rules={[{ required: true }]}
            name="CVV"
            trigger={"onChangeText"}
            validateTrigger={"onChangeText"}
          >
            <TextInput
              style={{
                marginBottom: 10,
                width: "80%",
                height: 50,
                borderRadius: 10,
                alignSelf: "center",
                textAlign: "left",
                placeholderTextColor: "red",
              }}
              mode="outlined"
              label="CVV"
              placeholder="XXX"
            />
          </RcFieldForm.Field>
        </RcFieldForm>
        <Card.Actions>
          {/*<TouchableOpacity onPress={onSubmit}>*/}
          {/*    <Text>Add</Text>*/}
          {/*</TouchableOpacity>*/}

          <Button
            // onPress={() => form.submit()}
            onPress={() => form.submit()}
            mode="contained"
            style={{ marginVertical: 10 }}
          >
            Submit
          </Button>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  );
};

export default PaymentScreen;
