import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Text, Card, TextInput, HelperText } from "react-native-paper";
import RcFieldForm, { Field } from "rc-field-form";
import { paymentCustomer } from "../../services/PaymentService";
import { useEvents } from "../../services/Application";

const PaymentScreen = ({ navigation }) => {
  const [validCardNumber, setIsValidCardNumber] = useState(true);
  const [form] = RcFieldForm.useForm();
  const event = useEvents();

  const onSubmit = async (values) => {
    try {
      await form.validateFields();
      const res = await paymentCustomer(values);
      if (res) {
        form.resetFields();
        navigation.navigate("PayListScreen");
        event.emit("GET_CARDS");
      }
    } catch (error) {
      console.log("validation faild", error);
    }
  };

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
            //uri: "https://img.freepik.com/free-vector/realistic-monochromatic-credit-card_52683-74366.jpg?w=2000",
            uri: "https://cdn3.vectorstock.com/i/1000x1000/50/97/blue-credit-card-isolated-on-white-background-vector-34565097.jpg",
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

          {/* <RcFieldForm.Field
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
          > */}
          <Field
            rules={[
              { required: true },
              {
                pattern: /^\d{16}$/,
                max: 16,
                min: 16,
                message: "Please enter a valid 16-digit card number",
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
                textAlign: "left",
              }}
              mode="outlined"
              label="Card Number"
              placeholder="Enter your card number"
              keyboardType="numeric"
              maxLength={16}
            />
          </Field>
          {!validCardNumber && (
            <HelperText color={"#EE2F36"}>Card Number is not valid</HelperText>
          )}

          {/* </RcFieldForm.Field> */}

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
              maxLength={3}
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
